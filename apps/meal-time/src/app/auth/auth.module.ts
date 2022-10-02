import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';
import { AuthComponent } from './auth.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
	{ path: 'auth', component: AuthComponent },
	{ path: 'auth/callback', component: CallbackComponent },
];

@NgModule({
	declarations: [AuthComponent],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		MealtimeUiComponentsModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class AuthModule {}
