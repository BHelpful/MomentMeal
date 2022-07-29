import { Component } from '@angular/core';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import Session from 'supertokens-web-js/recipe/session';

@Component({
  selector: 'meal-time-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // define isLoggedIn as a property
  isLoggedIn = false;

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
    return isSignedIn;
  }
}
