import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';

export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
	selector: 'mt-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input()
	public disabled = false;

	@Input()
	public variant: ButtonVariant = 'primary';

	@Input()
	public type: ButtonType = 'button';

	@Input()
	public bgColor = '';

	@Input()
	public color = '';

	@Input()
	public value = 'Button';

	@Input()
	public iconPath: string | IconDefinition = '';

	@Output()
	public clicked = new EventEmitter();

	public onClick() {
		if (!this.disabled) {
			this.clicked.emit();
		}
	}

	getStringIcon(): string {
		return this.iconPath as string;
	}

	getFaIcon(): IconDefinition {
		return this.iconPath as IconDefinition;
	}

	useStringIcon(): boolean {
		return (
			typeof this.iconPath === 'string' &&
			this.iconPath.length >= 1 &&
			this.iconPath !== undefined &&
			!this.disabled
		);
	}
	useFaIcon(): boolean {
		return (
			typeof this.iconPath !== 'string' &&
			'icon' in this.iconPath &&
			this.iconPath !== undefined &&
			!this.disabled
		);
	}
}
