import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController, IonContent, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoApple, logoGoogle, mail, mailOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { NombredeusuarioComponent } from 'src/app/components/nombredeusuario/nombredeusuario.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonInput, IonIcon, IonButton, IonContent, CommonModule, FormsModule]
})
export class LoginPage {

  bMostrarEmail = false;
  Usuario = { email: '', password: '' }
  bEsIOS = false;

  constructor(private auth: AuthService, private router: NavController, private _modal: ModalController, private utils: UtilsService, private _platform: Platform) { 
    addIcons( { logoGoogle , logoApple , mailOutline , mail } );

    if( this._platform.is('ios') ) {
      this.bEsIOS = true;
    }

  }

  async IniciarSesion() {

    await this.utils.ShowLoading( 'Iniciando sesión...' );
    const { data, error } = await this.auth.IniciarSesion_Email( this.Usuario.email, this.Usuario.password );
    await this.utils.HideLoading();
    if( error ) {
      await this.utils.ShowToast( error.message, 'danger' )
      return;
    }
    // console.log( data  )
    await this.auth.ObtenerSesionActual();
    this.ComprobarNombreUsuario();
    await this.router.navigateRoot( 'tabs' );
  }

  async IrAlRegistro() {
    await this.router.navigateRoot( 'register' );
  }

  async ComprobarNombreUsuario() {
     const data2 = await this.auth.TieneNombreUsuario();
    if( !data2 ) {
      const modal = await this._modal.create( {
      component: NombredeusuarioComponent
    })

    await modal.present();

      // alert('username ')
      // await this.auth.EstablecerNombreUsuario( 'raulmu99' );
    }

  }

  async Google() {
    const response = await this.auth.IniciarSesion_Google();

    console.log( response )
    if( response?.error ) {
      await this.utils.ShowToast( response.error.message, 'danger' )
      return;
    }

    if( response ) {
      await this.auth.ObtenerSesionActual();
      this.ComprobarNombreUsuario();
      await this.router.navigateRoot( 'tabs' );
    }

  }

  async Apple() {
    const response = await this.auth.IniciarSesion_Apple();

    if( response?.error ) {
      await this.utils.ShowToast( response.error.message, 'danger' )
      return;
    }

    if( response ) {
      await this.auth.ObtenerSesionActual();
      this.ComprobarNombreUsuario();
      await this.router.navigateRoot( 'tabs' );
    }
  }

}
