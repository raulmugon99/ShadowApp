import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _loading: LoadingController, private _alert: AlertController) { }

  async ShowLoading( message: string ) {
    const loading = await this._loading.create( {
      message
    })

    await loading.present();

  }

  async HideLoading() {
    await this._loading.dismiss();
  }
  
  async ShowAlert( message: string, header: string ) {
      const alert = await this._alert.create({
        header,
        message,
        buttons: ['OK']
      });
    
      await alert.present();
    }
 
}
