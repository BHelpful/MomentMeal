import { Component } from '@angular/core';

@Component({
	selector: 'meal-time-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	async signOut() {
		// await ThirdPartyEmailPassword.signOut();
		window.open('/', '_self', 'noopener');
	}
}
