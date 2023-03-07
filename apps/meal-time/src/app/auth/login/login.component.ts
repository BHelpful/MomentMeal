import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { nonNullObject } from '@meal-time/utils';
import { first } from 'rxjs';
import { AuthService } from '../services/auth.service';

type AuthForm = {
	email: string;
	password: string;
};

@Component({
	selector: 'meal-time-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {}
	submitted = false;
	returnUrl: string;
	error = false;
	errorStr: string;
	formErrorMessage = 'Something went wrong';
	isLoggedIn = false;

	testCustomValidator: 'ENABLED' | 'DISABLED' = 'ENABLED';

	emailFormControl = new FormControl('', [Validators.required]);

	passwordFormControl = new FormControl('', [
		Validators.required,
		Validators.minLength(8),
	]);

	authForm = new FormGroup({
		email: this.emailFormControl,
		password: this.passwordFormControl,
	});

	async ngOnInit(): Promise<void> {
		this.authForm.statusChanges.subscribe((status) => {
			if (status === 'VALID') {
				this.error = false;
			}
		});
		// if there is an "error" query param on this page, it means that
		// social login has failed for some reason. See the callback component file
		// for more context on this
		const params = new URLSearchParams(window.location.search);
		if (params.has('error')) {
			this.formErrorMessage = 'Something went wrong';
			this.error = true;
		}

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
	}

	public passwordValidator(value: string | number) {
		if (typeof value !== 'string') {
			return null;
		}
		const hasTwoDigits = /\d.*\d/.test(value);
		const hasTwoUppercase = /[A-Z].*[A-Z]/.test(value);
		const hasThreeLowercase = /[a-z].*[a-z].*[a-z]/.test(value);
		const hasSpecial = /[!@#$%^&*?]/.test(value);

		if (!hasTwoUppercase) {
			return 'Ensure string has two uppercase letters.';
		} else if (!hasSpecial) {
			return 'Ensure string has one special case letter.';
		} else if (!hasTwoDigits) {
			return 'Ensure string has two digits.';
		} else if (!hasThreeLowercase) {
			return 'Ensure string has three lowercase letters.';
		}

		return null;
	}

	public emailValidator(value: string | number) {
		if (typeof value !== 'string') {
			return null;
		}
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailRegex.test(value)) {
			return 'Invalid email address';
		}
		return null;
	}

	onSubmit() {
		this.submitted = true;

		const value = this.authForm?.value;

		if (!nonNullObject<AuthForm>(value)) {
			return;
		}

		const { email, password } = value;

		this.authService
			.login(email, password)
			.pipe(first())
			.subscribe(
				() => {
					this.errorStr = '';
					this.router.navigate([this.returnUrl]);
				},
				(error) => {
					this.errorStr = error;
				}
			);
	}

	onSignup() {
		this.submitted = true;

		const value = this.authForm?.value;

		if (!nonNullObject<AuthForm>(value)) {
			return;
		}

		const { email, password } = value;

		this.authService.register(email, password).subscribe(
			() => {
				this.errorStr = '';
				this.router.navigate([this.returnUrl]);
			},
			(error) => {
				this.errorStr = error;
			}
		);
	}

	goToLanding() {
		window.open('/', '_self');
	}
}
