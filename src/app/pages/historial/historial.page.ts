import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonContent, IonHeader, IonList, IonItem, IonIcon, IonLabel, IonSpinner, IonToolbar, IonTitle, IonNote, IonText } from '@ionic/angular/standalone';
import { CasosService } from 'src/app/services/casos.service';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { CasoPage } from '../caso/caso.page';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonText, IonNote, IonTitle, IonToolbar, IonSpinner, IonLabel, IonIcon, IonItem, IonList, IonContent, IonHeader, CommonModule, FormsModule]
})
export class HistorialPage {

  bCargando = true;
  Historial: any[] = [];
  
  constructor(private _casos: CasosService, private _modal: ModalController) { 
    addIcons( {star} );
  }

  async ionViewDidEnter() {
    this.bCargando = true;
    this.Historial = await this._casos.ObtenerHistorial();
    this.bCargando = false;
  }

  async IrAlCaso( idCaso: number) {
    // if( !await this._casos.EsCasoDiaHoy( idCaso ) ) {
    //   alert( 'El caso seleccionado no pertenece al dia actual. Se recargará.' );
    //   this.ionViewDidEnter();
    //   return;
    // }

    const modal = await this._modal.create( {
      component: CasoPage,
      componentProps: { idCaso }
    } );

    await modal.present();
    
  }

}
