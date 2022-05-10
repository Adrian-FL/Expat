import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimelineModule } from 'primeng/timeline';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddDiplomaComponent } from './components/add-diploma/add-diploma.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from "primeng/card";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { ShareQrCodeComponent } from './components/qr-code/qr-code.component';
import { MatSelectModule } from '@angular/material/select';
import { TransferComponent } from './components/transfer/transfer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddFacultyComponent } from './components/add-faculty/add-faculty.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDiplomaComponent,
    AddStudentComponent,
    ProfileComponent,
    HomeComponent,
    BaseComponent,
    ShareQrCodeComponent,
    TransferComponent,
    AddFacultyComponent,
    PdfViewerComponent,
    ViewStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    TimelineModule,
    CardModule,
    MatIconModule,
    MatTooltipModule,
    QRCodeModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
