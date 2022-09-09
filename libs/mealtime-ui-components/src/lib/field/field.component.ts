import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	faCircleCheck,
	faCircleExclamation,
	faCircleInfo,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export type InputTypes =
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'month'
	| 'number'
	| 'password'
	| 'search'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week';

@Component({
	selector: 'mt-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
	faError = faCircleExclamation;
	faValid = faCircleCheck;

	// viewchild
	@ViewChild('inputField') inputField: ElementRef;

	@Input() public disabled = false;

	@Input() public value = 'Value';

	@Input() public defaultIcon = faCircleInfo;

	@Input() public label = 'Label';

	@Input() public helperText = 'Helper text';

	@Input() public placeholder = 'Placeholder';

	@Input() public type: InputTypes = 'text';

	@Input() public formControl: FormControl = new FormControl();

	@Output() public valueChanged = new EventEmitter<string>();

	focusInput() {
		this.inputField.nativeElement.focus();
	}

	currentIcon(): IconDefinition {
		if (this.formControl.invalid && this.formControl.touched) {
			return this.faError;
		} else if (this.formControl.valid) {
			return this.faValid;
		} else if (!this.disabled) {
			return this.defaultIcon;
		}

		return this.faError;
	}
}
