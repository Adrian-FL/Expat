import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacultyService } from 'src/app/services/faculty.service';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-add-diploma',
  templateUrl: './add-diploma.component.html',
  styleUrls: ['./add-diploma.component.css']
})
export class AddDiplomaComponent extends BaseComponent {

  form: FormGroup;
  submitted: boolean;
  file: File;
  students: any[] = [];

  constructor(userService: UserService, private formBuilder: FormBuilder, private facultyService: FacultyService, private snackBar: MatSnackBar) {

    super(userService);
    this.initializeFormGroup();
    this.loadStudentsForFaculty();
  }

  async loadStudentsForFaculty() {
    this.students = await this.facultyService.getStudents();
  }

  initializeFormGroup() {
    this.form = this.formBuilder.group({
      metaMaskPublicAddress: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('studentMetaMaskPublicAddress', this.form.value.metaMaskPublicAddress);
    formData.append('facultyMetamaskPublicAddress', this.loggedUser.metaMaskPublicAddress);

    this.userService.uploadDiploma(formData).subscribe(data => {
      console.log(this.form.value.metaMaskPublicAddress);
      console.log(data);
      this.userService.saveNewDiplomaHash(this.form.value.metaMaskPublicAddress, data);
      this.form.reset();

      for (var name in this.form.controls) {
        this.form.controls[name].setErrors(null);
      }

      this.snackBar.open("Diploma successfully added", "Ok");
    },
      err => {
        console.log(err);
        this.snackBar.open(err.message, "Ok");
      });

  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];

      reader.readAsDataURL(this.file);

      console.log(this.file);

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result
        });
      };

    }
  }
}