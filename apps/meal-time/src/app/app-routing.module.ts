import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
	{
		path: '',
		component: LandingComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: HomeComponent,
			},
		],
	},
	{
		path: '',
		children: [
			{
				path: 'login',
				component: LoginComponent,
			},
		],
	},
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
