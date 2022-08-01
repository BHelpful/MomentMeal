import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { Component } from '@angular/core';

@Component({
  selector: 'meal-time-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  async signOut() {
    await ThirdPartyEmailPassword.signOut();
    window.location.assign('/auth');
  }
}
