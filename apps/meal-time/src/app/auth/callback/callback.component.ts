import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'meal-time-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    // sleep for a bit to allow the user to see the error message
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      // we try and consume the authorisation code sent by the social login provider.
      // this knows which third party provider has sent the user back because
      // we store that in localstorage when the user clicks on the provider's button
      // on the sign in / up screen
      const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp({});
      if (response.status !== 'OK') {
        // this means that the third party provider does not have an email associated
        // with this user. In this case, we disallow the sign in and show a message
        // on the login UI
        return window.location.assign('/auth?error=signin');
      }
      // login / signup is successful, and we redirect the user to the home page.
      // Note that session cookies are added automatically and nothing needs to be
      // done here about them.
      window.location.assign('/home');
    } catch (_) {
      // we show a something went wrong error in the auth page.
      window.location.assign('/auth?error=signin');
    }
  }
}
