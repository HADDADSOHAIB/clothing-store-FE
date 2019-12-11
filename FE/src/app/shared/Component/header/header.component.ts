import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser:User;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.accountService.getCurrentUser().subscribe(user=>{
      this.currentUser=user;
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.accountService.loadCurrentUser();
  }
}
