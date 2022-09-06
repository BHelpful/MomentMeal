import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'mt-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
	faCoffee = faCoffee;
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
