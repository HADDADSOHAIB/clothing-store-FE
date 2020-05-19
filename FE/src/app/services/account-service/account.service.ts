import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/address';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentUser$: BehaviorSubject<User> = new BehaviorSubject(undefined);

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService  
  ) {
  }

  loadCurrentUser() {
    const token = this.cookieService.get('token');

    if (token) {
      this.httpClient.post(BACK_END + 'users/token', { token }).pipe(take(1))
        .subscribe(
          (res) => {
            const { id, userEmail, userName, firstName, lastName, phoneNumber, role } = res['data'];
            this.currentUser$.next(new User(id, userEmail, userName, firstName, lastName, phoneNumber, null, role, null, null));
          },
          (err) => {
            this.currentUser$.next(undefined);
          }
        );
    }
  }

  updateUserProfile(user: User) {
    return this.httpClient.put(BACK_END + 'users/' + user.id, user) as Observable<User>;
  }

  addAddress(id: number, address: Address) {
    return this.httpClient.post(BACK_END + 'addresses/' + id, address);
  }

  deleteAddress(id: number) {
    return this.httpClient.delete(BACK_END + 'addresses/' + id);
  }

  getAllUsers() {
    return this.httpClient.get(BACK_END + 'users') as Observable<any>;
  }
}
