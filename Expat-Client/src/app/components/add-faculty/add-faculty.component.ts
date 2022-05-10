import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent, User } from '../base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent extends BaseComponent {

  form: FormGroup;
  submitted: boolean;

  constructor(userService: UserService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

    super(userService);
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.form = this.formBuilder.group({
      metaMaskPublicAddress: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: [2, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.form.value.facultyMetaMaskPublicAddress = this.loggedUser.metaMaskPublicAddress;
    this.form.value.type = 2;
    console.log(this.form.value);

    if (this.form.invalid) return;

    this.userService.addUser(this.form.value).subscribe((data: any) => {
      console.log(data);
      this.form.reset();

      for (var name in this.form.controls) {
        this.form.controls[name].setErrors(null);
      }

      this.userService.saveNewUserHash({
        metaMaskPublicAddress: data.metaMaskPublicAddress,
        timestamp: data.timestamp
      });
      this.snackBar.open("Faculty successfully added", "Ok");
    },
      err => {
        console.log(err);
        this.snackBar.open(err.message, "Ok");
      });

  }

}
