import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';
import { LandingComponent } from './landing.component';

@NgModule({
	declarations: [LandingComponent],
	imports: [CommonModule, MealtimeUiComponentsModule, FontAwesomeModule],
})
export class LandingModule {}
