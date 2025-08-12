import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, NavController } from '@ionic/angular/standalone';
import { SupabaseService } from './services/supabase.service';
import { AuthService } from './services/auth.service';
import { AdMob, AdMobBannerSize, BannerAdOptions, BannerAdPosition, AdOptions } from '@capacitor-community/admob';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private auth: AuthService, private navCtrl: NavController ) {
    this.checkUserSession();
    // this.initAds();
  }

  async checkUserSession() {
    await this.auth.ObtenerSesionActual();

    if( this.auth.SesionActual ) {
      // this.navCtrl.navigateRoot('/home');  // O la ruta que quieras para usuarios logueados
    } else {
      this.navCtrl.navigateRoot('/login');  // O la ruta que quieras para usuarios logueados
    }

  }

  //  async initAds() {
  //   await AdMob.initialize({
  //     testingDevices: ['TEST_DEVICE_ID'], // Opcional
  //     initializeForTesting: true, // true para usar anuncios de prueba
  //   });

  // }
}
