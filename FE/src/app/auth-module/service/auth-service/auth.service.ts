import { Injectable } from '@angular/core';
import { Credentials } from '../../Model/credentials';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  createAccount(credentials: Credentials) {
      return this.http.post("https://localhost:44394/api/Auth/create",credentials) as Observable<string>;
  }
  checkEmail(email:string) {
      return this.http.post("https://localhost:44394/api/Auth/check", email) as Observable<boolean>;
  }

  constructor(
    private http:HttpClient
  ) { }
}
