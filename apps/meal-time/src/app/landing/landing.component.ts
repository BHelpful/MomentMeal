import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'meal-time-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
	constructor(private router: Router) {}

	goToAuth() {
		this.router.navigate(['/login']);
	}

	// open new tab with https://mealtime.hellonext.co/
	openFeedbackLink() {
		window.open('https://mealtime.hellonext.co/', 'WindowName', 'noopener');
	}
}
