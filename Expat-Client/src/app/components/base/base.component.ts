import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  private connectedWallet: any = undefined;
  protected loggedUser: User;

  constructor(protected userService: UserService) { }

  async ngOnInit() {
    this.connectedWallet = await this.userService.getConnectedWallet();
    if (!this.connectedWallet.address) {
      console.log(this.connectedWallet.status);
      return;
    }
    //this.user = this.getLoggedUser();

    await this.saveUserInLocalStorage();
  }

  private async saveUserInLocalStorage() {
    const user = await this.userService.getUserByMetamaskAddress(this.connectedWallet.address);
    this.loggedUser = user;
    localStorage.setItem('user', user);
    console.log(user);
  }

  public async getConnectedWallet() {
    if (this.connectedWallet)
      return this.connectedWallet;
    this.connectedWallet = await this.userService.getConnectedWallet();
    return this.connectedWallet;
  }
}

export enum UserType {
  Student = 1,
  Faculty = 2,
  Administrator = 3
}

export interface User {
  type: UserType;
  firstName: string;
  lastName: string;
  email: string;
  metaMaskPublicAddress: string;
  timestamp: Date;
  diplomas: any[];
}