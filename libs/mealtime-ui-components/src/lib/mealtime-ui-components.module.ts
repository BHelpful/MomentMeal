import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './button/button.component';
import { FieldComponent } from './field/field.component';

@NgModule({
	imports: [CommonModule, FontAwesomeModule],
	declarations: [ButtonComponent, FieldComponent],
	exports: [ButtonComponent, FieldComponent],
})
export class MealtimeUiComponentsModule {}
