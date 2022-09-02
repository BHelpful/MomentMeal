import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { FieldComponent } from './field/field.component';

@NgModule({
	imports: [CommonModule],
	declarations: [ButtonComponent, FieldComponent],
	exports: [ButtonComponent, FieldComponent],
})
export class MealtimeUiComponentsModule {}
