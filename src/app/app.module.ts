import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { StudentnotificationsComponent } from './studentnotifications/studentnotifications.component';
import { AdminnotificationsComponent } from './adminnotifications/adminnotifications.component';
import { AdminresultsComponent } from './adminresults/adminresults.component';
import { StudentresultsComponent } from './studentresults/studentresults.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { from } from 'rxjs';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    StudentComponent,
    AdminprofileComponent,
    StudentprofileComponent,
    StudentnotificationsComponent,
    AdminnotificationsComponent,
    AdminresultsComponent,
    StudentresultsComponent,
    AboutusComponent,
    CarouselComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
