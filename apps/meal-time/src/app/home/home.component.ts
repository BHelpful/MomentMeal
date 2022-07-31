import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'meal-time-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log('HomeComponent.ngOnInit');
  }

  async signOut() {
    await ThirdPartyEmailPassword.signOut();
    window.location.assign('/auth');
  }
}
