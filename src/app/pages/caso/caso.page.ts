import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonCheckbox, NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCardHeader, IonCard, IonCardTitle, IonList, IonItem, IonCardContent, IonIcon, IonButtons, IonSpinner, IonSkeletonText } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { CasosService } from 'src/app/services/casos.service';
import { addIcons } from 'ionicons';
import { close, checkbox } from 'ionicons/icons';

@Component({
  selector: 'app-caso',
  templateUrl: './caso.page.html',
  styleUrls: ['./caso.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonSpinner, IonButtons, IonIcon, IonButton, IonCardContent, IonItem, IonList, IonCardTitle, IonCard, IonCardHeader, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCheckbox]
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

  constructor(private route: ActivatedRoute, private _casos: CasosService, private router: NavController, private _modal: ModalController) {
    addIcons({close,checkbox});
   }

  async ngOnInit() {

    const data = await this._casos.Get_Caso_byId( this.idCaso )
    this.caso = data;
    // console.log( this.caso )
    if( this.caso.Resolucion.length > 0 ) {
      this.bCasoResuelto = true;
      this.Asesino = this.caso.Sospechoso.filter( ( ase: any ) => ase.Asesino == true )[0];
      this.AsesinoResuelto = this.caso.Sospechoso.filter( ( ase: any ) => this.caso.Resolucion[0].sospechoso_id )[0];
    }

    console.log( data )
    this.bCargando = false;
  }

  VerPista( index: number ) {
    if( index == 0 ) {
      this.bPista1Usada = true;
    } else if( index == 1 ) {
      this.bPista2Usada = true;
    }
    alert( this.caso.Pista[index].Descripcion );
  }

  async Resolver( ) {
    if( !this.SospechosoSeleccionado ) {
      alert( 'No se ha seleccionado ningún sospechoso.' )
      return;
    }
    
    const data = await this._casos.GuardarResolucion( this.idCaso, this.SospechosoSeleccionado.id, this.SospechosoSeleccionado.Asesino, this.bPista1Usada, this.bPista2Usada );

    if( !data.Correcto ) {
      alert( data.Message )
      return;
    }
    
    if( this.SospechosoSeleccionado.Asesino ) {
      alert( 'Correcto. ' + this.SospechosoSeleccionado.Resolucion )
    } else {
      alert( 'Incorrecto. ' + this.SospechosoSeleccionado.Resolucion )
    }
    
  }

  async Cerrar() {
    // await this.router.navigateRoot('home')
    await this._modal.dismiss();
  }

  SospechosoSelEvent( ev: any, sos: any) {
    this.SospechosoSeleccionado = null;

    if( ev.detail.checked ) {
      this.SospechosoSeleccionado = sos;
    }
    // console.log( ev )
  }

}