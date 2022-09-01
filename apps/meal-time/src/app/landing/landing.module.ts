import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';

const routes: Routes = [{ path: '', component: LandingComponent }];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MealtimeUiComponentsModule,
  ],
})
export class LandingModule {}
