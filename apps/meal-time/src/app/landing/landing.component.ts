import { Component } from '@angular/core';

@Component({
  selector: 'meal-time-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  // go to auth route
  goToAuth() {
    window.location.href = '/auth';
  }
}
