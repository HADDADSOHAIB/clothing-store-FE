import { Injectable } from '@angular/core';
import { Credentials } from '../../../shared/Models/credentials';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../../../shared/Models/email';
import { Token } from '../../../shared/Models/token';
import { BACK_END } from 'backend';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  createAccount(credentials: Credentials) {
    return this.http.post(BACK_END+"register",credentials) as Observable<Token>;
  }
  login(credentials: Credentials) {
    return this.http.post(BACK_END+"authenticate",credentials) as Observable<Token>;
}
  checkEmail(credentials: Credentials) {
      return this.http.post(BACK_END+"isemailok",credentials) as Observable<any>;
  }

  constructor(
    private http:HttpClient
  ) { }
}
