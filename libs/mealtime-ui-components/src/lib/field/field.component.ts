import { Component, ElementRef, Input, ViewChild } from '@angular/core';

// TODO: Follow https://medium.com/angular-in-depth/how-to-create-an-icon-library-in-angular-4f8863d95a to create an icon library

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
