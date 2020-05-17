import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { Privilege } from 'src/app/models/privilege';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getRoles() {
    return this.httpClient.get(BACK_END + 'roles') as Observable<Role[]>;
  }

  upgradeUser(email: String) {
    return this.httpClient.get(BACK_END + 'roles/upgrade/' + email);
  }
}
