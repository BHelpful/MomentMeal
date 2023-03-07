import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
	selector: 'meal-time-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	constructor(private authService: AuthService, private router: Router) {}

	async signOut() {
		await this.authService.logout();
		this.router.navigate(['/login']);
	}

	get isLoggedIn() {
		return this.authService.isLoggedIn();
	}

	get user() {
		return this.authService.currentUserValue;
	}
}
