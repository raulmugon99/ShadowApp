import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, AlertController, NavController, IonContent, IonHeader, IonItem, IonList, IonLabel, IonToolbar, IonTitle, IonCard, IonCol, IonGrid, IonRow, IonButton, IonPopover } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { CasosService } from 'src/app/services/casos.service';
import { TerminosServicioComponent } from 'src/app/components/terminos-servicio/terminos-servicio.component';
import { PoliticaPrivacidadComponent } from 'src/app/components/politica-privacidad/politica-privacidad.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonPopover, IonButton, IonRow, IonGrid, IonCol, IonCard, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonContent, IonHeader, CommonModule, FormsModule]
})
export class PerfilPage {

  constructor(private router: NavController, public auth: AuthService, private _casos: CasosService, private _alert: AlertController, private _modal: ModalController, private _utils: UtilsService) { }

  async CerrarSesion() {
    await this._utils.ShowLoading( 'Cerrando sesión...' );
    await this.auth.signOut();
    await this.router.navigateRoot( 'login' );
    await this._utils.HideLoading();
  }

  async NotificarUnProblema() {
    const alert = await this._alert.create({
      header: 'Notificar Problema',
      buttons: [ 'Cancelar' , 'Notificar' ],
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

  async VerTerminosDeServicio() {
    const modal = await this._modal.create( { component: TerminosServicioComponent } );
    await modal.present();
  }

  async VerPoliticaPrivacidad() {
    const modal = await this._modal.create( { component: PoliticaPrivacidadComponent } );
    await modal.present();
  }

  Medallas: any[] = [
    {
      icono: 'close'
    },
    {
      icono: 'close'
    },{
      icono: 'close'
    },{
      icono: 'close'
    },{
      icono: 'close'
    },{
      icono: 'close'
    },
  ]

}
