import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../Models/user';
import { take } from 'rxjs/operators';
import { Token } from '../../Models/token';
import { Address } from '../../Models/address';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  subject:BehaviorSubject<User>=new BehaviorSubject<User>(new User(0,'','','','','',[],[]));
  user:User=new User(0,'','','','','',[],[]);
  constructor(private httpClient:HttpClient) { 
    console.log("bonjour");
  }

  getCurrentUser(){
    return this.subject;
  }
  getCurrentUserObject(){
    return this.user;
  }
  loadCurrentUser(){
    let token=new Token(localStorage.getItem('token'));
    if(token.token){
      this.httpClient.post(BACK_END+"users",token).pipe(take(1)).subscribe((user:User)=>{
        this.user=user;
        this.subject.next(user);
      },error=>{
        console.log(error);
      });
    }
    else{
      this.user=new User(0,'','','','','',[],[]);
      this.subject.next(new User(0,'','','','','',[],[]));
    }
  }

  updateUserProfile(user:User){
    return this.httpClient.put(BACK_END+"users/"+user.id,user) as Observable<User>;
  }

  addAddress(id:number, address:Address){
    return this.httpClient.post(BACK_END+"addresses/"+id,address);
  }

  deleteAddress(id:number){
    return this.httpClient.delete(BACK_END+"addresses/"+id);
  }

  getAllUsers(){
    return this.httpClient.get(BACK_END+"users") as Observable<User[]>;
  }
}
