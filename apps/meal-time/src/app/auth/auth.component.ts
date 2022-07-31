import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import Session from 'supertokens-web-js/recipe/session';

// TODO continue to implement functions from here (https://github.com/supertokens/supertokens-web-js/blob/master/examples/vuejs/with-thirdpartyemailpassword/src/views/AuthView.vue) Possibly look here (https://supertokens.com/blog/adding-social-login-to-your-website-with-supertokens)

@Component({
  selector: 'meal-time-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  // define params
  error = false;
  errorMessage = 'Something went wrong';
  // define isLoggedIn as a property
  isLoggedIn = false;

  async ngOnInit(): Promise<void> {
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
    if (await Session.doesSessionExist()) {
      // since a session already exists, we redirect the user to the HomeView.vue component
      window.location.assign('/home');
    }
  }

  // login function
  async signUp(email: string, password: string) {
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
      // window.location.href = '/dashboard';
      this.isLoggedIn = true;
    }
  }

  // login function
  async signIn(email: string, password: string) {
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
      // window.location.href = '/dashboard';
      this.isLoggedIn = true;
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
    window.location.href = googleAuthURL;
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
    window.location.href = appleAuthURL;
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
    window.location.href = facebookAuthURL;
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
    window.location.href = githubAuthURL;
  }
}
