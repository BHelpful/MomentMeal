import { Component } from '@angular/core';

@Component({
  selector: 'meal-time-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  // go to auth route
  goToAuth() {
    window.location.href = '/auth';
  }
}
