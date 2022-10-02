import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';
import { LandingComponent } from './landing.component';

const routes: Routes = [{ path: '', component: LandingComponent }];

@NgModule({
	declarations: [LandingComponent],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		MealtimeUiComponentsModule,
		FontAwesomeModule,
	],
})
export class LandingModule {}
