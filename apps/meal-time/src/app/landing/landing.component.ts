import { Component } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'meal-time-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
	faLock = faLock;

	// go to auth route
	goToAuth() {
		window.location.href = '/auth';
	}
}
