import { Component } from '@angular/core';

@Component({
	selector: 'meal-time-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
	// go to auth route
	goToAuth() {
		window.open('/home', '_self', 'noopener');
	}

	// open new tab with https://mealtime.hellonext.co/
	openFeedbackLink() {
		window.open('https://mealtime.hellonext.co/', 'WindowName', 'noopener');
	}
}
