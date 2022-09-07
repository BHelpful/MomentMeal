import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'meal-time-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
	faLock = faLock;

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	// go to auth route
	goToAuth() {
		window.location.href = '/auth';
	}
}
