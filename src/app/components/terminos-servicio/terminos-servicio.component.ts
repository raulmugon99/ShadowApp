import { Component } from '@angular/core';
import { ModalController, IonContent, IonHeader, IonToolbar, IonNote, IonTitle, IonButton, IonIcon, IonButtons } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-terminos-servicio',
  templateUrl: './terminos-servicio.component.html',
  styleUrls: ['./terminos-servicio.component.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonButton, IonTitle, IonNote, IonToolbar, IonHeader, IonContent, ]
})
export class TerminosServicioComponent {

  constructor(private _modal: ModalController) {
    addIcons( { close } );
   }

  async Cerrar() {
    await this._modal.dismiss();
  }

}
