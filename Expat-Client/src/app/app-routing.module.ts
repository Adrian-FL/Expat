import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDiplomaComponent } from './components/add-diploma/add-diploma.component';
import { AddFacultyComponent } from './components/add-faculty/add-faculty.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { HomeComponent } from './components/home/home.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShareQrCodeComponent } from './components/qr-code/qr-code.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';

const routes: Routes = [
  { path: 'add-diploma', component: AddDiplomaComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'add-faculty', component: AddFacultyComponent },
  { path: 'view-students', component: ViewStudentsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transfer-student', component: TransferComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/diploma', component: PdfViewerComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile/:id/diploma', component: PdfViewerComponent },
  { path: 'qr', component: ShareQrCodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
