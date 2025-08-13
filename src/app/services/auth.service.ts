import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Session } from '@supabase/supabase-js';
import { GoogleLoginResponse, SocialLogin } from '@capgo/capacitor-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SesionActual: Session | null = null;
  UsuarioActual: any;

  constructor( private supabaseService: SupabaseService ) {
    this.ObtenerSesionActual();

    SocialLogin.initialize({
      google: { webClientId: '1054095659719-6mtmmtar8mp5o8qg4s8cc632pbo3ckt3.apps.googleusercontent.com' },
      apple: { clientId: 'your-client-id' }
    })

  }

  // Método para login con email y contraseña
  async IniciarSesion_Email(email: string, password: string) {
    return await this.supabaseService.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async IniciarSesion_Google() {

    try {

      // Paso 1: Login con Google en el dispositivo
      const res = await SocialLogin.login({
        provider: 'google',
        options: {}
      });

      if( res.result && res.result.responseType == 'online' ) {

        if (!res?.result?.idToken) {
            throw new Error('No se obtuvo idToken de Google');
          }

        // Paso 2: Pasar token a Supabase
        return await this.supabaseService.supabase.auth.signInWithIdToken({
          provider: 'google',
          token: res.result.idToken
        });

      }
      
    } catch (err) {
      console.error('Error en login:', err);
    }

    return null
  }

  async IniciarSesion_Apple() {
    try {
      
      const res = await SocialLogin.login({
        provider: 'apple',
        options: { scopes: ['email', 'name'] }
      });

      if( res.result ) {

         if (!res?.result?.idToken) {
            throw new Error('No se obtuvo idToken de Google');
          }

        // Paso 2: Pasar token a Supabase
        return await this.supabaseService.supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: res.result.idToken
        });

      }

    } catch (err) {
      console.error('Error en login:', err);
    }

    return null
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
    this.SesionActual = null;
    this.UsuarioActual = null;
    return await this.supabaseService.supabase.auth.signOut();
  }

  async ObtenerSesionActual() {
    const { data } = await this.supabaseService.supabase.auth.getSession();
    this.SesionActual = data.session;

    const usuario_id = this.SesionActual?.user.id;
    const data2 = await this.supabaseService.supabase.from('Usuario')
      .select()
      .eq( 'usuario_id' , usuario_id )
      .single()

      this.UsuarioActual = data2.data;
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

  async ExisteNombreDeUsuario( sNombreUsuario: string ): Promise< boolean > {
    return new Promise( async ( resolve ) => {
      const { data , error } = await this.supabaseService.supabase.from('Usuario')
      .select()
      .ilike( 'NombreDeUsuario' , sNombreUsuario )

      if( data?.length == 0 ) {
        resolve( false )
      } else {
        resolve( true )
      }

    })
  }

}