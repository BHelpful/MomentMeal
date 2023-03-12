import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
	selector: 'meal-time-root',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
	constructor(private primengConfig: PrimeNGConfig) {}

	ngOnInit() {
		this.primengConfig.ripple = true;
	}
}
