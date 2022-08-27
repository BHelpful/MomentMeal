import { CallbackComponent } from './callback/callback.component';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';

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
  ],
})
export class AuthModule {}
