import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

    Usuario = { email: '', password: '' }
  constructor(private auth: AuthService, private router: NavController) { }

  ngOnInit() {
  }


  async Registrarse() {

    const { data, error } = await this.auth.signUp( this.Usuario.email , this.Usuario.password );
    if( error ) {

    } else {
      await this.router.navigateRoot( 'login' );
    }
    console.log( data )
  }
}
