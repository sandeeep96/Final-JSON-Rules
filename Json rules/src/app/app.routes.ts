import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './shared/components';
import { LoginComponent } from './shared/okta/login.component';
import { DataResolver } from './app.resolver';
import { AuthGuard } from './shared/okta/auth.guard.service';
import { RulesComponent } from './rules';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rules', component: RulesComponent },
  { path: '**', component: NoContentComponent },
];
