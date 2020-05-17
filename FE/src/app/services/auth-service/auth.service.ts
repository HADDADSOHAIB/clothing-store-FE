import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END } from 'backend';
import { Credentials } from 'src/app/models/credentials';
import { Token } from 'src/app/models/token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	createAccount(credentials: Credentials) {
		return this.http.post(BACK_END + 'register', credentials) as Observable<Token>;
	}
	login(credentials: Credentials) {
		return this.http.post(BACK_END + 'authenticate', credentials) as Observable<Token>;
}
	checkEmail(credentials: Credentials) {
			return this.http.post(BACK_END + 'isemailok', credentials) as Observable<any>;
	}

	constructor(
		private http: HttpClient
	) { }
}
