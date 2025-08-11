import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentButton, IonSegment, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/angular/standalone';
import { CasosService } from 'src/app/services/casos.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonList, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSegment, IonSegmentButton, IonListHeader]
})
export class RankingPage implements OnInit {

  constructor(private _casos: CasosService) { }

  sOpcionMostrar = 'semanal';
  Ranking: any[] = [];
  async ngOnInit() {
    this.CargarRankingSeleccionado();
  }

  async CargarRankingSeleccionado() {
    this.Ranking = [];

    if( this.sOpcionMostrar == 'semanal' ) {
      this.Ranking = await this._casos.ObtenerRanking_Semanal();
    } else if( this.sOpcionMostrar == 'mensual' ) {
      this.Ranking = await this._casos.ObtenerRanking_Mensual();
    }

  }

  CambioTipoRanking(ev: any) {
    this.sOpcionMostrar = ev.detail.value;
    this.CargarRankingSeleccionado();
  }

}
