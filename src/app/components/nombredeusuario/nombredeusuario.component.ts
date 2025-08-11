import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, IonHeader, IonToolbar, IonContent, IonInput, IonButton } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nombredeusuario',
  templateUrl: './nombredeusuario.component.html',
  styleUrls: ['./nombredeusuario.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent, IonToolbar, IonHeader, CommonModule, FormsModule ]
})
export class NombredeusuarioComponent  implements OnInit {

  NombreDeUsuario = '';
  constructor(private auth: AuthService, private _modal: ModalController) { }

  ngOnInit() {}

  async EstablecerNombre() {

    await this.auth.EstablecerNombreUsuario( this.NombreDeUsuario );
    await this.CerrarModal();

  }

  async CerrarModal() {

    await this._modal.dismiss();
    
  }

}
