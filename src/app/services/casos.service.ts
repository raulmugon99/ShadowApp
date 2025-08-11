import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CasosService {

 constructor(private supabaseService: SupabaseService, private auth: AuthService) {}

  async getActiveCases() {
    const { data, error } = await this.supabaseService.supabase
      .from('Caso')
      .select('*')
      .eq( 'FechaDisponible' , '2025-08-20' )
      .single()

    if (error) {
      console.error('Error fetching active cases:', error);
      return null;
    }

    return data;
  }

  async Get_Caso_byId( idCaso: number ) {
         const usuarioId = this.auth.SesionActual?.user.id;

    const { data, error } = await this.supabaseService.supabase
      .from('Caso')
      .select('*, Sospechoso(*), Pista(*), Resolucion(*)')
      .eq( 'id' , idCaso)
       .eq( 'Resolucion.usuario_id' , usuarioId)
      .single();

    if (error) {
      console.error('Error fetching active cases:', error);
      return null;
    }

    return data;
  }

  GuardarResolucion( idCaso: number, sospechoso_id: number, Correcto: boolean, bPista1: boolean, bPista2: boolean ): Promise< ResolucionResponse > {
    return new Promise( async ( resolve ) => {

      const usuarioId = this.auth.SesionActual?.user.id;

      const bExiste = await this.supabaseService.supabase
        .from( 'Resolucion' )
        .select()
        .eq( 'caso_id' , idCaso )
        .eq( 'usuario_id' , usuarioId )

      let Puntuacion = 100;

      if( !Correcto ) {
        Puntuacion = 50;
      }

      let hou = new Date().getHours();

      Puntuacion = Puntuacion - hou;

      if( bPista1 ) {
        Puntuacion = Puntuacion - 20; 
      }

      if( bPista2 ) {
        Puntuacion = Puntuacion - 30; 
      }

      if( bExiste && bExiste.data !== null && bExiste.data.length > 0 ) {
        resolve( { Correcto: false, Message: 'Ya has resuelto este asesinato.' } );
        return
      }
   
      const { data, error } = await this.supabaseService.supabase
        .from('Resolucion')
        .upsert( { Correcto: Correcto, Puntuacion: Puntuacion, caso_id: idCaso, sospechoso_id:sospechoso_id, usuario_id: usuarioId, Pista1Usada: bPista1, Pista2Usada: bPista2 })

      if( !error ) {
        resolve( { Correcto: true, Message: 'Asesinato resuelto correctamente' } );
      } else {
        resolve( { Correcto: false, Message: error.message } );
      }
      
    })

  }

  async EsCasoDiaHoy(idCaso: number): Promise< boolean > {
    return new Promise( async ( resolve ) => {
      const dFechaHoy = new Date();
      let sAñoHoy = dFechaHoy.getFullYear();
      let sMesHoy = ( dFechaHoy.getMonth() + 1 ).toString().padStart( 2 , '0' );
      let sDiaHoy = dFechaHoy.getDate().toString().padStart( 2 , '0' );

      let sFechaHoy = `${sAñoHoy}-${sMesHoy}-${sDiaHoy}`

      // console.log( idCaso, sFechaHoy )

      const { data, error } = await this.supabaseService.supabase
        .from('Caso')
        .select('*')
        .eq( 'id' , idCaso )
        .eq( 'FechaDisponible' , sFechaHoy )

      if( data && data.length > 0 ) {
        resolve( true )
      } else {
        resolve( false )
      }

    })

  }

  async ObtenerRanking(): Promise<RankingResponse> {
    return new Promise( async ( resolve ) => {
      const usuarioId = this.auth.SesionActual?.user.id;

      const { data, error } = await this.supabaseService.supabase
        .rpc('ranking_semana', { usuario: usuarioId })
        .single();

      if (error) {
        console.error(error);
        resolve( { Correcto: false, Message: error.message } );
      } else {
        // console.log(data);
        const rankingData = data as { puntos: number, puesto: number };
        resolve( { Correcto: true, Message: 'Ranking obtenido correctamente.', Puntos: rankingData.puntos, Posicion: rankingData.puesto } );
      }
    })

  }

  async ObtenerRanking_2(): Promise< any[] > {
    return new Promise( async ( resolve ) => {

      const { data, error } = await this.supabaseService.supabase
        .rpc('top_3_ranking' )

      if (error) {
        console.error(error);
        resolve( [] );
      } else {

        resolve( data as any[] );
      }
    })
  }

   async ObtenerRanking_Semanal(): Promise< any[] > {
    return new Promise( async ( resolve ) => {

      const { data, error } = await this.supabaseService.supabase
        .rpc('top_ranking_semanal' )

      if (error) {
        console.error(error);
        resolve( [] );
      } else {
        // console.log(data);

        resolve( data as any[] );
      }
    })
  }

     async ObtenerRanking_Mensual(): Promise< any[] > {
    return new Promise( async ( resolve ) => {

      const { data, error } = await this.supabaseService.supabase
        .rpc('top_ranking_mensual' )

      if (error) {
        console.error(error);
        resolve( [] );
      } else {
        // console.log(data);

        resolve( data as any[] );
      }
    })
  }

  ObtenerHistorial(): Promise< any[] >  {
          const usuarioId = this.auth.SesionActual?.user.id;
          return new Promise( async ( resolve ) => {

      const { data, error } = await this.supabaseService.supabase
        .rpc('historial_usuario', { usuario: usuarioId } )

      if (error) {
        console.error(error);
        resolve( [] );
      } else {
        // console.log(data);

        resolve( data as any[] );
      }
    })
  }
}

export interface ResolucionResponse {
  Correcto: boolean,
  Message: string
}

export interface RankingResponse {
  Correcto?: boolean,
  Message?: string,
  Puntos?: number,
  Posicion?: number
}