import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { GeneratePassComponent } from './components/generate-pass/generate-pass.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'editUser/:id', component: UserDetailsComponent},
  { path: 'home', component: HomeComponent},
  { path: 'adduser', component: AddUserComponent},
  { path: 'generatePass', component: GeneratePassComponent},

  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
