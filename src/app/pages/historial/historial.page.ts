import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonList, IonItem, IonIcon, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { CasosService } from 'src/app/services/casos.service';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonLabel, IonIcon, IonItem, IonList, IonContent, IonHeader, CommonModule, FormsModule]
})
export class HistorialPage {

  bCargando = true;
  Historial: any[] = [];
  
  constructor(private _casos: CasosService) { 
    addIcons( {star} );
  }

  async ionViewDidEnter() {
    this.bCargando = true;
    this.Historial = await this._casos.ObtenerHistorial();
    this.bCargando = false;
  }

}
