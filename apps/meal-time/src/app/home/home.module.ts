import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MealtimeUiComponentsModule } from 'mealtime-ui-components';
import { HomeComponent } from './home.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, MealtimeUiComponentsModule],
})
export class HomeModule {}
