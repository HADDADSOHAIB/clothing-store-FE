import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { AccountService } from '../../services/account-service/account.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser:User;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getCurrentUser().subscribe(user=>this.currentUser=user);
  }

}
