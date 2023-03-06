import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { LandingModule } from './landing/landing.module';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { MealtimeUiComponentsModule } from 'mealtime-ui-components';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/services/auth.module';
import { errorInterceptorProvider } from './auth/services/error.interceptor';
import { jwtInterceptorProvider } from './auth/services/jwt-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [AppComponent, LoginComponent],
	imports: [
		MealtimeUiComponentsModule,
		LandingModule,
		HomeModule,
		BrowserModule,
		AppRoutingModule,
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
