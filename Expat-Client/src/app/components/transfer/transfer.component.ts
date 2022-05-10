import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacultyService } from 'src/app/services/faculty.service';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent extends BaseComponent {

  form: FormGroup;
  submitted: boolean;
  file: File;
  students: any[] = [];
  faculty: any[] = [];

  constructor(userService: UserService, private formBuilder: FormBuilder, private facultyService: FacultyService, private snackBar: MatSnackBar) {

    super(userService);
    this.initializeFormGroup();
    this.loadStudentsForFaculty();
    this.loadFaculty();
  }

  async loadStudentsForFaculty() {
    this.students = await this.facultyService.getStudents();
  }

  async loadFaculty() {
    const wallet = await this.getConnectedWallet();
    this.faculty = await this.facultyService.getFaculty();
    console.log(this.faculty);
    console.log(wallet.address);
    this.faculty = this.faculty.filter(o => o.metaMaskPublicAddress.toUpperCase() !== wallet.address.toUpperCase());
  }

  initializeFormGroup() {
    this.form = this.formBuilder.group({
      studentMetaMaskPublicAddress: ['', Validators.required],
      facultyMetaMaskPublicAddress: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.userService.transferStudent(this.form.value).subscribe(data => {
      console.log(this.form.value.metaMaskPublicAddress);
      // this.userService.saveNewDiplomaHash(this.form.value.metaMaskPublicAddress, data);
      this.form.reset();

      for (var name in this.form.controls) {
        this.form.controls[name].setErrors(null);
      }

      this.snackBar.open("Student successfully tranfered", "Ok");
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