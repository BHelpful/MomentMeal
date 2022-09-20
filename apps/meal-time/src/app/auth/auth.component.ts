import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { nonNullObject } from './../../../../../libs/utils/src/lib/ts-guards';
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
	// define params
	error = false;
	errorMessage = 'Something went wrong';
	// define isLoggedIn as a property
	isLoggedIn = false;

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])(?=.{8,})/;
	passwordFormControl = new FormControl('', [
		Validators.required,
		Validators.pattern(this.strongRegex),
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
		// social login has failed for some reason. See the AuthCallbackView.vue file
		// for more context on this
		const params = new URLSearchParams(window.location.search);
		if (params.has('error')) {
			this.errorMessage = 'Something went wrong';
			this.error = true;
		}
		// this redirects the user to the HomeView.vue component if a session
		// already exists.
		this.checkForSession();
	}

	async checkForSession() {
		this.authForm.get('email');
		if (await Session.doesSessionExist()) {
			// since a session already exists, we redirect the user to the HomeView.vue component
			window.location.assign('/home');
		}
	}

	// login function
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
			this.errorMessage = response.formFields[0].error;
		}
	}

	// login function
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
			this.errorMessage = 'Wrong email or password';
		}
	}

	// logout function
	async signOut() {
		Session.signOut();
		this.isLoggedIn = false;
	}

	// check if user is logged in
	async userLoggedIn() {
		const isSignedIn = await Session.doesSessionExist();
		this.isLoggedIn = isSignedIn;
		console.log(isSignedIn);
		return isSignedIn;
	}

	// Google sign in
	async onGooglePressed() {
		const googleAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'google',
				}
			);

		// we redirect the user to sign in with google
		window.open(googleAuthURL, '_self');
	}

	// Apple sign in
	async onApplePressed() {
		const appleAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'apple',
				}
			);

		// we redirect the user to sign in with apple
		window.open(appleAuthURL, '_self');
	}

	// Facebook sign in
	async onFacebookPressed() {
		const facebookAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'facebook',
				}
			);

		// we redirect the user to sign in with facebook
		window.open(facebookAuthURL, '_self');
	}

	// Github sign in
	async onGithubPressed() {
		const githubAuthURL =
			await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(
				{
					authorisationURL: `${environment.websiteUrl}/auth/callback`,
					providerId: 'github',
				}
			);

		// we redirect the user to sign in with github
		window.open(githubAuthURL, '_self');
	}

	// goToLanding
	goToLanding() {
		window.location.assign('/');
	}
}
