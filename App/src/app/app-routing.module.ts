import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/register/register/register.component';
import { UserComponent } from './modules/user/user.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { EditProfileComponent } from './modules/edit-profile/edit-profile.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'',
    component:NavbarComponent,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path:'home',
        component:LandingPageComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'login',
        component:LoginComponent
      }
    ]
  },
  
  {
    path:'user',
    component:UserComponent,
    canActivate : [AuthGuard],
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path:'home',
        component:HomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'edit',
        component:EditProfileComponent,
      },
      {
        path:'edit/:email',
        component:EditProfileComponent,
      },
      {
        path:'statistics',
        component:StatisticsComponent,
      }
    ]
  },

  {
    path:'logout',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
