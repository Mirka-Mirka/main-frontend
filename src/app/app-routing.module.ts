import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { AccommodationDetailsComponent } from "./page/accommodation-details/accommodation-details.component";
import { LoginComponent } from './page/login/login.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { AuthGuard } from "./guards/auth.guard";
import { AccommodationComponent } from './accommodation/accommodation.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'accommodation/:id', component: AccommodationDetailsComponent, pathMatch: 'full' },
  { path: 'accommodation', component: AccommodationComponent, pathMatch: 'full' },
//  { path: '**', redirectTo: 'requests', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
