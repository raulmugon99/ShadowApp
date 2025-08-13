import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, IonHeader, IonToolbar, IonContent, IonInput, IonButton, IonNote } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-nombredeusuario',
  templateUrl: './nombredeusuario.component.html',
  styleUrls: ['./nombredeusuario.component.scss'],
  standalone: true,
  imports: [IonNote, IonButton, IonInput, IonContent, IonToolbar, IonHeader, CommonModule, FormsModule ]
})
export class NombredeusuarioComponent  implements OnInit {

  NombreDeUsuario = '';
  constructor(private auth: AuthService, private _modal: ModalController, private utils: UtilsService) { }

  ngOnInit() {}

  async EstablecerNombre() {
    if( !this.ValidarNombre() ) {
      await this.utils.ShowToast( 'El nombre de usuario solo puede contener letras y números.' , 'danger' );
      return;
    }

    if( await this.auth.ExisteNombreDeUsuario( this.NombreDeUsuario ) ) {
      await this.utils.ShowToast( 'El nombre de usuario indicado ya está en uso.' , 'danger' );
      return;
    }

    await this.auth.EstablecerNombreUsuario( this.NombreDeUsuario );
    await this.auth.ObtenerSesionActual();
    await this.CerrarModal();

  }

  async CerrarModal() {

    await this._modal.dismiss();
    
  }

  ValidarNombre() {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(this.NombreDeUsuario);
  }

}
