import { Component } from '@angular/core';
import { BaseComponent, User, UserType } from './components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = 'Expath-Client';

  public loggedUser: User;

  isStudent() {
    return this.loggedUser && this.loggedUser.type === UserType.Student;
  }

  isFaculty() {
    return this.loggedUser && this.loggedUser.type === UserType.Faculty;
  }

  isAdministrator() {
    return this.loggedUser && this.loggedUser.type === UserType.Administrator;
  }
}
