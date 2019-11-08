import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/Models/user';
import { Address } from 'src/app/shared/Models/address';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //--------------------fake Data----------------------
currentUser:User=new User("Haddadsoh@gmail.com","HadddadSohaib","Sohaib","Haddad",
"+212613667379",[
  new Address(1,"TANJA EL BALIA DHAR EL MERSE","rue 14 N 9","Tanger","Tanger-Asilah","Maroc","90000"),
  new Address(1,"TANJA EL BALIA ","rue 05  N 08","Tanger","Tanger-Asilah","Maroc","90010")
]);
//-----------------------------------------------------
  userSubject: BehaviorSubject<User>=new BehaviorSubject(this.currentUser);
  constructor() { }

  getUser(){
    return this.userSubject;
  }
}
