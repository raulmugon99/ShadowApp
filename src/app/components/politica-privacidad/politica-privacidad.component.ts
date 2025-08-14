import { Component } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon, IonTitle, IonNote } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.component.html',
  styleUrls: ['./politica-privacidad.component.scss'],
  standalone: true,
  imports: [IonNote, IonTitle, IonIcon, IonButton, IonButtons, IonContent, IonToolbar, IonHeader, ]
})
export class PoliticaPrivacidadComponent {

  constructor(private _modal: ModalController) {
    addIcons( { close } );
   }

  async Cerrar() {
    await this._modal.dismiss();
  }

}
