import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// Angular Material modules
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, fas } from '@fortawesome/free-solid-svg-icons';  // Import solid icons
import { fab } from '@fortawesome/free-brands-svg-icons';  // Import brand icons
import { CreateUserDialogComponentComponent } from './components/create-user-dialog/create-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';
import { ECardComponent } from './components/e-card/e-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { EcardDialogComponent } from './components/ecard-dialog/ecard-dialog.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateUserDialogComponentComponent,
    ProfileDialogComponent,
    ECardComponent,
    EcardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    // Add both solid (fas) and brand (fab) icon packs
    library.addIconPacks(fas, fab);
    // library.addIcons(faUser); 
  }
}
