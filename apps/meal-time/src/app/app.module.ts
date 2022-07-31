import { HomeModule } from './home/home.module';
import { LandingModule } from './landing/landing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { AuthModule } from './auth/auth.module';
import { CallbackComponent } from './auth/callback/callback.component';
import { HomeComponent } from './home/home.component';

SuperTokens.init({
  appInfo: {
    apiDomain: 'http://localhost:3333',
    apiBasePath: '/api',
    appName: 'meal-time',
  },
  recipeList: [
    EmailPassword.init(),
    ThirdPartyEmailPassword.init(),
    Session.init(),
  ],
});

@NgModule({
  declarations: [AppComponent, CallbackComponent, HomeComponent],
  imports: [
    LandingModule,
    AuthModule,
    HomeModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
