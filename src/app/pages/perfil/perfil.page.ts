import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  constructor(private router: NavController, public auth: AuthService) { }

  ngOnInit() {
  }

  async CerrarSesion() {
    await this.auth.signOut();
    await this.router.navigateRoot( 'login' )
  }

}
