import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { CasosService } from 'src/app/services/casos.service';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HistorialPage implements OnInit {

  constructor(private _casos: CasosService) { 
    addIcons( {star} );
  }

  Historial: any[] = [];

  async ngOnInit() {
    this.Historial = await this._casos.ObtenerHistorial();
  }

}
