import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _loading: LoadingController, private _alert: AlertController, private _toast: ToastController ) { }

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

  async ShowToast( message: string, color: 'danger' | 'success' ,iDuration: number = 2500 ) {
    const toast = await this._toast.create( {
      message,
      duration: iDuration,
      color
    })

    await toast.present();
  }
 
}
