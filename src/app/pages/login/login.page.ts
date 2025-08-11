import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonInput, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { attach, logoApple, logoGoogle, mail, mailOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { NombredeusuarioComponent } from 'src/app/components/nombredeusuario/nombredeusuario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonRouterOutlet, IonInput, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, private router: NavController, private _modal: ModalController) { 
    addIcons({logoGoogle,logoApple,mailOutline,mail});
  }

  ngOnInit() {}

  bMostrarEmail = false;
  Usuario = { email: 'damraulmu99@gmail.com', password: '2julio1999' }
  async IniciarSesion() {

    const data = await this.auth.signIn( this.Usuario.email, this.Usuario.password );
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

}
