import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent, User } from '../base/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent {

  @ViewChild('pdfViewer') public pdfViewer: any;

  events: any[] = [];

  directionIndex: number = 0;

  metamaskAddress: string;

  user: User;

  constructor(userService: UserService, private route: ActivatedRoute) {
    super(userService);
    this.metamaskAddress = this.route.snapshot.params['id'];
    this.loadUser();
  }

  private async loadUser() {
    var wallet = undefined;
    console.log(this.metamaskAddress);
    if (!this.metamaskAddress) {
      wallet = await this.getConnectedWallet();
      this.user = await this.userService.getUserByMetamaskAddress(wallet.address);
    }
    else {
      this.user = await this.userService.getUserByMetamaskAddress(this.metamaskAddress);
    }

    await this.userService.containsHash({
      metaMaskPublicAddress: this.user.metaMaskPublicAddress,
      timestamp: this.user.timestamp
    });

    this.events.push(
      this.getStartStudyingEvent()
    );

    if (this.user.diplomas && this.user.diplomas.length > 0) {

      for (let i = 0; i < this.user.diplomas.length; i++) {
        const diploma = this.user.diplomas[i];
        await this.userService.containsDiplomaHash(this.user.metaMaskPublicAddress, diploma);

        this.events.push(this.getDiplomaEvent(diploma));
      }
    }
  }

  getStartStudyingEvent() {
    return {
      direction: this.getDirection(),
      date: new Date(this.user.timestamp).toDateString(),
      text: `${this.user.firstName} ${this.user.lastName ? this.user.lastName : ''} was introduced in system`,
      checked: this.userService.userTimestampCheck,
      isDiploma: false
    }
  };

  getDiplomaEvent(diploma: any) {
    return {
      direction: this.getDirection(),
      date: new Date(diploma.timestamp).toDateString(),
      text: `${this.user.firstName} ${this.user.lastName} has received a diploma from ${diploma.facultyName}`,
      checked: this.userService.diplomaValidationCheck,
      isDiploma: true
    };
  }

  getDirection() {
    return this.directionIndex++ % 2 ? 'r' : 'l';
  }

  public async reloadUser(metamaskAddress: string) {
    this.metamaskAddress = metamaskAddress;
    this.events = [];
    this.loadUser();
  }
}
