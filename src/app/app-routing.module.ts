import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminComponent } from './admin/admin.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AdminnotificationsComponent } from './adminnotifications/adminnotifications.component';
import { AdminresultsComponent } from './adminresults/adminresults.component';
import { StudentComponent } from './student/student.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { StudentnotificationsComponent } from './studentnotifications/studentnotifications.component';
import { StudentresultsComponent } from './studentresults/studentresults.component';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
                        {path:'home',component:HomeComponent,
                        children:[
                          {path:'carousel',component:CarouselComponent},
                          {path:'aboutus',component:AboutusComponent},
                          {path:'register',component:RegisterComponent},
                          {path:'login',component:LoginComponent}
                        ]},
                          {path:'admin',component:AdminComponent,
                            children:[{path:'',component:AdminprofileComponent},
                          {path:'adminprofile',component:AdminprofileComponent},
                          {path:'adminnotifications',component:AdminnotificationsComponent},
                          {path:'adminresults',component:AdminresultsComponent},
                        ]
                      },

                      {path:'student',component:StudentComponent,
                        children:[{path:'',component:StudentprofileComponent},
                        {path:'studentprofile',component:StudentprofileComponent},
                        {path:'studentnotifications',component:StudentnotificationsComponent},
                        {path:'studentresults',component:StudentresultsComponent}
                        ]},
                        {path:'',redirectTo:'home/carousel',pathMatch:'full'}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
