import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, NavController } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(private auth: AuthService, private navCtrl: NavController, private _utils: UtilsService ) {
    this.checkUserSession();
  }

  async checkUserSession() {
    await this._utils.ShowLoading( 'Cargando...' );
    await this.auth.ObtenerSesionActual();
    await this._utils.HideLoading();

    if( this.auth.SesionActual ) {
      this.navCtrl.navigateRoot('/tabs');  // O la ruta que quieras para usuarios logueados
    } else {
      this.navCtrl.navigateRoot('/login');  // O la ruta que quieras para usuarios logueados
    }

  }

}
