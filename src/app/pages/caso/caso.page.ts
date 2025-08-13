import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, ModalController, IonCheckbox, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCardHeader, IonCard, IonCardTitle, IonList, IonItem, IonCardContent, IonIcon, IonButtons, IonSpinner, IonPopover, IonAlert, IonTextarea } from '@ionic/angular/standalone';
import { CasosService } from 'src/app/services/casos.service';
import { addIcons } from 'ionicons';
import { close, checkbox, informationCircleOutline, warningOutline, timeOutline, trophyOutline, skullOutline, bulbOutline } from 'ionicons/icons';
import { AdsService } from 'src/app/services/ads.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-caso',
  templateUrl: './caso.page.html',
  styleUrls: ['./caso.page.scss'],
  standalone: true,
  imports: [ IonAlert, IonPopover,  IonSpinner, IonButtons, IonIcon, IonButton, IonCardContent, IonItem, IonList, IonCardTitle, IonCard, IonCardHeader, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCheckbox, IonTextarea ]
})
export class CasoPage implements OnInit {

  @Input() idCaso: any = '';
  caso: any = {}
  bCargando = true;
  bPista1Usada = false;
  bPista2Usada = false;
  SospechosoSeleccionado: any = null;
  bCasoResuelto = false;
  Asesino: any = null;
  AsesinoResuelto: any = null;

  isPopoverOpen = false;
  
  constructor(private _casos: CasosService, private _modal: ModalController, private _ads: AdsService, private utils: UtilsService, private _alert: AlertController) {
    addIcons({close,informationCircleOutline,warningOutline,checkbox,timeOutline,trophyOutline,skullOutline,bulbOutline});
  }

  async ngOnInit() {
    this.CargarCaso();
  }

  async CargarCaso() {
    this.bCargando = true;

    const data = await this._casos.Get_Caso_byId( this.idCaso )
    this.caso = data;

    if( this.caso.Resolucion.length > 0 ) {
      this.bCasoResuelto = true;
      this.Asesino = this.caso.Sospechoso.filter( ( ase: any ) => ase.Asesino == true )[0];
      this.AsesinoResuelto = this.caso.Sospechoso.filter( ( ase: any ) => ase.id == this.caso.Resolucion[0].sospechoso_id )[0];
    }

    this.bCargando = false;
  }

  async VerPista( index: number ) {
 
    await this._ads.showRewarded();

    if( index == 0 ) {
      this.bPista1Usada = true;
    } else if( index == 1 ) {
      this.bPista2Usada = true;
    }

    // alert( this.caso.Pista[index].Descripcion );
    await this.utils.ShowAlert( this.caso.Pista[index].Descripcion , `Pista ${ index + 1}` );

  }

  async Resolver( ) {
    if( !this.SospechosoSeleccionado ) {
      await this.utils.ShowAlert( 'No se ha seleccionado ningún sospechoso.' , 'Error' );
      return;
    }
    
    const data = await this._casos.GuardarResolucion( this.idCaso, this.SospechosoSeleccionado.id, this.SospechosoSeleccionado.Asesino, this.bPista1Usada, this.bPista2Usada );

    if( !data.Correcto ) {
      alert( data.Message )
      return;
    }
    
    if( this.SospechosoSeleccionado.Asesino ) {
      await this.utils.ShowAlert( this.SospechosoSeleccionado.Resolucion , 'Correcto' );
    } else {
      await this.utils.ShowAlert( this.SospechosoSeleccionado.Resolucion , 'Incorrecto' );
    }
    
    await this._ads.showInterstitial();
    this.CargarCaso();

  }

  async Cerrar() {
    await this._modal.dismiss();
  }

  SospechosoSelEvent( ev: any, sos: any) {
    this.SospechosoSeleccionado = null;

    if( ev.detail.checked ) {
      this.SospechosoSeleccionado = sos;
    }

  }

  NotificarProblema( ev: any ) {

    if( ev && ev.detail && ev.detail.value ) {
    console.log( ev )
    }
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
        await this._casos.GuardarError( this.idCaso , data.data.values?.problema );
      }
    } )
  }
}