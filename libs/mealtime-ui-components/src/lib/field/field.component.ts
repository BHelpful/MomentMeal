import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'mt-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
	// viewchild
	@ViewChild('inputField') input: ElementRef;

	@Input()
	public disabled = false;

	@Input()
	public value = 'Value';

	focusInput() {
		this.input.nativeElement.focus();
	}
}
