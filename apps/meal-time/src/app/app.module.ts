import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { LandingModule } from './landing/landing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';
import { routes } from './app.routes';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/services/auth.module';
import { errorInterceptorProvider } from './auth/services/error.interceptor';
import { jwtInterceptorProvider } from './auth/services/jwt-interceptor';

@NgModule({
	declarations: [AppComponent, LoginComponent],
	imports: [
		RouterModule.forRoot(routes),
		MealtimeUiComponentsModule,
		LandingModule,
		HomeModule,
		BrowserModule,
		BrowserAnimationsModule,
		AuthModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],
	providers: [jwtInterceptorProvider, errorInterceptorProvider],
	bootstrap: [AppComponent],
})
export class AppModule {}
