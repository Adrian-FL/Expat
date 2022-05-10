import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class ShareQrCodeComponent extends BaseComponent {

  public qrCode: string = 'local';
  constructor(userService: UserService, private sanitizer: DomSanitizer) {
    super(userService);

    this.loadQrCode();
  }

  async loadQrCode() {
    const wallet = await this.getConnectedWallet();
    this.qrCode = `http://${window.location.host}/profile/${wallet.address}`;
  }

}
