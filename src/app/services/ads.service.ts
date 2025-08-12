import { Injectable } from '@angular/core';
import { AdMob, AdMobBannerSize, BannerAdOptions, BannerAdPosition } from '@capacitor-community/admob';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  // private readonly bannerId = 'ca-app-pub-3940256099942544/6300978111';
  // private readonly interstitialId = 'ca-app-pub-9858035614599073/4815381744';
  // private readonly rewardedId = 'ca-app-pub-9858035614599073/7465595813';

  // IDs de prueba de AdMob (CAMBIAR por los reales en producción)
  private readonly bannerId = 'ca-app-pub-3940256099942544/6300978111';
  private readonly interstitialId = 'ca-app-pub-3940256099942544/1033173712';
  private readonly rewardedId = 'ca-app-pub-3940256099942544/5224354917';

 constructor( private utils: UtilsService) {
    this.initialize();
  }

  /** Inicializar AdMob */
  private async initialize() {
    await AdMob.initialize({
      testingDevices: [],
      initializeForTesting: true, // Quitar en producción
    });
  }

  /** Mostrar banner fijo */
  // async showBanner() {
  //   const options: BannerAdOptions = {
  //     adId: this.bannerId,
  //     adSize: AdMobBannerSize.BANNER,
  //     position: BannerAdPosition.BOTTOM_CENTER,
  //     margin: 0,
  //   };
  //   await AdMob.showBanner(options);
  // }

  /** Ocultar banner */
  // async hideBanner() {
  //   await AdMob.hideBanner();
  // }

  /** Mostrar interstitial */
  async showInterstitial() {
    await AdMob.prepareInterstitial({ adId: this.interstitialId });
    await AdMob.showInterstitial();
  }

  /** Mostrar anuncio con recompensa */
  async showRewarded() {
    await this.utils.ShowLoading( 'Cargando Anuncio...' );
    await AdMob.prepareRewardVideoAd({ adId: this.rewardedId });
    await this.utils.HideLoading();
    const reward = await AdMob.showRewardVideoAd();
    // console.log('Recompensa obtenida:', reward);
    return reward; // Puedes usarlo para dar premios en el juego
  }
}
