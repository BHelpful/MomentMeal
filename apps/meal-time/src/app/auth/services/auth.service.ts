/**
 * Based on
 * https://github.com/cornflourblue/angular-7-jwt-authentication-example
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEntity } from '@meal-time/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<UserEntity | null>;
	public currentUser: Observable<UserEntity | null>;

	constructor(private readonly http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<UserEntity | null>(
			JSON.parse(localStorage.getItem('currentUser') || '{}')
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue() {
		return this.currentUserSubject.value;
	}

	register(email: string, password: string) {
		return this.http.post<UserEntity>('/api/auth/register', {
			email,
			password,
		});
	}

	login(email: string, password: string) {
		return this.http
			.post<UserEntity>('/api/auth/login', { email, password })
			.pipe(
				map((user) => {
					// login successful if there's a jwt token in the response
					if (user && user.accessToken) {
						// store user details and jwt token in local
						// storage to keep user logged in between page refreshes
						localStorage.setItem('currentUser', JSON.stringify(user));
						this.currentUserSubject.next(user);
					}

					return user;
				})
			);
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}

	isLoggedIn() {
		return !!this.currentUserValue;
	}
}
