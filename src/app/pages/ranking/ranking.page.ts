import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonSegmentButton, IonSegment, IonList, IonLabel, IonItem, IonSpinner, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { CasosService } from 'src/app/services/casos.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonSpinner, IonItem, IonLabel, IonList, IonSegment, IonContent, IonHeader, CommonModule, FormsModule, IonSegment, IonSegmentButton]
})
export class RankingPage {

  bCargando = true;
  sOpcionMostrar = 'semanal';
  Ranking: any[] = [];

  constructor(private _casos: CasosService) { }

  async ionViewDidEnter() {
    this.CargarRankingSeleccionado();
  }

  async CargarRankingSeleccionado() {
    this.bCargando = true;
    this.Ranking = [];

    if( this.sOpcionMostrar == 'semanal' ) {
      this.Ranking = await this._casos.ObtenerRanking_Semanal();
    } else if( this.sOpcionMostrar == 'mensual' ) {
      this.Ranking = await this._casos.ObtenerRanking_Mensual();
    }

    this.bCargando = false;
  }

  CambioTipoRanking(ev: any) {
    this.sOpcionMostrar = ev.detail.value;
    this.CargarRankingSeleccionado();
  }

}
