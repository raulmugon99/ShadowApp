import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, NavController, IonContent, IonHeader, IonItem, IonList, IonLabel, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { CasosService } from 'src/app/services/casos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonContent, IonHeader, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  constructor(private router: NavController, public auth: AuthService, private _casos: CasosService, private _alert: AlertController) { }

  ngOnInit() {
  }

  async CerrarSesion() {
    await this.auth.signOut();
    await this.router.navigateRoot( 'login' )
  }

  async NotificarUnProblema() {
    const alert = await this._alert.create({
      header: 'Notificar Problema',
      buttons: ['Cancelar', 'Notificar'],
      inputs: [ { name: 'problema', type: 'textarea', placeholder: 'Introduce el problema...', attributes: { rows: 5 } } ]
    });
  
    await alert.present();

    await alert.onDidDismiss().then( async ( data ) => {
     
      if( data.data.values?.problema ) {
        await this._casos.GuardarError( 0 , data.data.values?.problema );
      }
    } )
  }

  EnviarCorreoSoporte() {
    location.href = 'mailto:damraulmu99@gmail.com'
  }

}
