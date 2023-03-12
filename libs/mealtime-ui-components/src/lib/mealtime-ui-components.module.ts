import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './button/button.component';
import { FieldComponent } from './field/field.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		ProgressSpinnerModule,
	],
	declarations: [ButtonComponent, FieldComponent, SpinnerComponent],
	exports: [ButtonComponent, FieldComponent, SpinnerComponent],
})
export class MealtimeUiComponentsModule {}
