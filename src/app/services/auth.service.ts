import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SesionActual: Session | null = null;
  constructor( private supabaseService: SupabaseService ) {
    this.ObtenerSesionActual();
  }

  // Método para login con email y contraseña
  async signIn(email: string, password: string) {
    return await this.supabaseService.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  // Método para registro con email y contraseña (opcional)
  async signUp(email: string, password: string) {
    return await this.supabaseService.supabase.auth.signUp({
      email,
      password
    });
  }

  // Método para logout
  async signOut() {
    return await this.supabaseService.supabase.auth.signOut();
  }

  async ObtenerSesionActual() {
    const { data } = await this.supabaseService.supabase.auth.getSession();
    this.SesionActual = data.session;
    // console.log( this.SesionActual )
  }

  async EstablecerNombreUsuario(sNombreDeUsuario: string) {
    const usuario_id = this.SesionActual?.user.id
    const { data , error } = await this.supabaseService.supabase.from('Usuario')
      .upsert( { NombreDeUsuario: sNombreDeUsuario , usuario_id: usuario_id } )
      .eq( 'usuario_id' , usuario_id )

  }

  async TieneNombreUsuario(): Promise< boolean > {
    return new Promise( async ( resolve ) => {
      const { data , error } = await this.supabaseService.supabase.from('Usuario')
      .select()
      .eq( 'usuario_id' , this.SesionActual?.user.id )

      if( data?.length == 0 ) {
        resolve( false )
      } else {
        resolve( true )
      }

    })
  }

}