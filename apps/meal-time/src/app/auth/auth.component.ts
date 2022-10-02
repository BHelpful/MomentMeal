import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nonNullObject } from '@meal-time/utils';
import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { environment } from './../../environments/environment';

type AuthForm = {
	email: string;
	password: string;
};

@Component({
	selector: 'meal-time-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	error = false;
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
		// this redirects the user to the home component if a session
		// already exists.
		this.checkForSession();
	}

	async checkForSession() {
		this.authForm.get('email');
		if (await Session.doesSessionExist()) {
			// since a session already exists, we redirect the user to the home component
			window.location.assign('/home');
		}
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

	async signUp() {
		const value = this.authForm?.value;

		if (!nonNullObject<AuthForm>(value)) {
			return;
		}

		const { email, password } = value;
		const response = await ThirdPartyEmailPassword.emailPasswordSignUp({
			formFields: [
				{
					id: 'email',
					value: email,
				},
				{
					id: 'password',
					value: password,
				},
			],
		});
		if (response.status === 'OK') {
			window.location.assign('/home');
			this.isLoggedIn = true;
		} else {
			this.error = true;
			this.formErrorMessage = response.formFields[0].error;
		}
	}

	// default submit function
	async signIn() {
		const value = this.authForm?.value;

		if (!nonNullObject<AuthForm>(value)) {
			return;
		}

		const { email, password } = value;
		const response = await ThirdPartyEmailPassword.emailPasswordSignIn({
			formFields: [
				{
					id: 'email',
					value: email,
				},
				{
					id: 'password',
					value: password,
				},
			],
		});
		if (response.status === 'OK') {
			window.location.assign('/home');
			this.isLoggedIn = true;
		} else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
			this.error = true;
			this.formErrorMessage = 'Wrong email or password';
		}
	}

	async signOut() {
		Session.signOut();
		this.isLoggedIn = false;
	}

	async userLoggedIn() {
		const isSignedIn = await Session.doesSessionExist();
		this.isLoggedIn = isSignedIn;
		console.log(isSignedIn);
		return isSignedIn;
	}

	async onGooglePressed() {
		const googleAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'google',
				}
			);

		window.open(googleAuthURL, '_self');
	}

	async onApplePressed() {
		const appleAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'apple',
				}
			);

		window.open(appleAuthURL, '_self');
	}

	async onFacebookPressed() {
		const facebookAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'facebook',
				}
			);

		window.open(facebookAuthURL, '_self');
	}

	async onGithubPressed() {
		const githubAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'github',
				}
			);

		window.open(githubAuthURL, '_self');
	}

	goToLanding() {
		window.location.assign('/');
	}
}
