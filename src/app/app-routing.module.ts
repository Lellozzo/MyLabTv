import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ContattiComponent } from './component/contatti/contatti.component';
import { DetailMediaComponent } from './component/detail-media/detail-media.component';
import { AttoriComponent } from './component/attori/attori.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CinetecaComponent } from './component/cineteca/cineteca.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'contatti', component: ContattiComponent},
  {path: "film/:id", component: DetailMediaComponent },
  {path: "serietv/:id", component: DetailMediaComponent },
  {path: "similarmovie/:id", component: DetailMediaComponent },
  {path: "attori/:id", component: AttoriComponent },
  {path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent },
  { path: 'users/:id/cineteca', component: CinetecaComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
