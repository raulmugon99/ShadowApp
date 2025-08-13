import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonInput, IonButton, IonContent, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

    Usuario = { email: '', password: '' }
  constructor(private auth: AuthService, private router: NavController, private _utils: UtilsService) { }

  ngOnInit() {
  }


  async Registrarse() {

    await this._utils.ShowLoading( 'Creando usuario...' );
    const { data, error } = await this.auth.signUp( this.Usuario.email , this.Usuario.password );
    await this._utils.HideLoading();

    if( error ) {
      await this._utils.ShowToast( error.message, 'danger' )
    } else {
      await this.router.navigateRoot( 'login' );
    }

  }


  async Cancelar() {
    await this.router.navigateRoot( 'login' );
  }
}
