import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, NavController } from '@ionic/angular/standalone';
import { SupabaseService } from './services/supabase.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private auth: AuthService, private navCtrl: NavController ) {
    this.checkUserSession();
  }

  async checkUserSession() {
    await this.auth.ObtenerSesionActual();

    if( this.auth.SesionActual ) {
      // this.navCtrl.navigateRoot('/home');  // O la ruta que quieras para usuarios logueados
    } else {
      this.navCtrl.navigateRoot('/login');  // O la ruta que quieras para usuarios logueados
    }

  }
}
