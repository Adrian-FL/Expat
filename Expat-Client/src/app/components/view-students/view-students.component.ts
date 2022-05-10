import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacultyService } from 'src/app/services/faculty.service';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent extends BaseComponent {

  students: any[] = [];

  @ViewChild(ProfileComponent) public profileComponent: ProfileComponent;

  constructor(userService: UserService, private formBuilder: FormBuilder, private facultyService: FacultyService, private snackBar: MatSnackBar) {
    super(userService);
    this.loadStudentsForFaculty();

  }

  async loadStudentsForFaculty() {
    this.students = await this.facultyService.getStudents();
  }

  reloadUser(e: any) {
    const address = e.value;
    this.profileComponent.reloadUser(address);
  }
}