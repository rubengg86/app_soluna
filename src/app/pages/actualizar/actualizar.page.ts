import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage {

  constructor(private platform: Platform) {}

  openStore() {
    const androidUrl = 'market://details?id=com.soluna.cliente';
    const iosUrl = 'itms-apps://itunes.apple.com/app/id6478595369'; // replace with real App Store ID
    const url = this.platform.is('ios') ? iosUrl : androidUrl;
    window.open(url, '_system');
  }
}
