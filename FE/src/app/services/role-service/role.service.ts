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

  getRoles(){
    return this.httpClient.get(BACK_END+"roles") as Observable<Role[]>;
  }

  getPrivileges(){
    return this.httpClient.get(BACK_END+"privileges") as Observable<Privilege[]>;
  }

  updateRole(role:Role){
    return this.httpClient.put(BACK_END+"roles/"+role.id,role) as Observable<Role>;
  }

  createRole(role:Role){
    return this.httpClient.post(BACK_END+"roles",role) as Observable<Role>;
  }
}
