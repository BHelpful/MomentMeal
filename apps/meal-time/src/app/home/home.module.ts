import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';

const routes: Routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MealtimeUiComponentsModule,
  ],
})
export class HomeModule {}
