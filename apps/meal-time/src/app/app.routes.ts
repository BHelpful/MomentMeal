import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
	{
		path: '',
		component: LandingComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard],
	},
	{ path: '**', redirectTo: '' },
];
