import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalController, IonHeader, IonContent, IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { CasosService } from '../../services/casos.service';
import { AuthService } from '../../services/auth.service';
import { CasoPage } from '../../pages/caso/caso.page';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ RouterLink, IonLabel, IonList, IonItem, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonButton, IonCard, IonHeader, IonContent, CommonModule ],
})
export class HomePage {

  constructor(private _casos: CasosService, public auth: AuthService, private _modal: ModalController) {
    addIcons({star})
  }

  caso: any = {};
  puntos = 0;
  ranking = 0;
  pistasUsadas = 0;
  top3: any[] = [];
  tiempoRestante = '';
  dificultadArray: number[] = [];

  async ngOnInit() {
  
    this.actualizarTiempo();
    setInterval(() => this.actualizarTiempo(), 60000);
    const data: any = await this._casos.getActiveCases();

    this.caso = data;
    this.dificultadArray = Array(this.caso.Dificultad).fill(0);
    const Ranking = await this._casos.ObtenerRanking();
    this.puntos = Ranking?.Puntos || 0;
    this.ranking = Ranking?.Posicion || 0;

    this.top3 = await this._casos.ObtenerRanking_2();

  }

  actualizarTiempo() {
    const ahora = new Date();
    const finDelDia = new Date();
    finDelDia.setHours(23, 59, 59, 999);
    const diff = finDelDia.getTime() - ahora.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.tiempoRestante = `${horas}h ${minutos}m`;
  }

  async IrAlCaso( idCaso: number) {
    if( await this._casos.EsCasoDiaHoy( idCaso ) ) {

      const modal = await this._modal.create( {
        component: CasoPage,
        componentProps: { idCaso }
      } );

      await modal.present();
    }
  }

}