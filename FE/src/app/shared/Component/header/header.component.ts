import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account-service/account.service';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser:User;
  currentUserRoles: String[]=[];

  constructor(
    private accountService: AccountService,
    private sidenavService: SidenavService
    ) { }

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.accountService.getCurrentUser().subscribe(user=>{
      this.currentUser=user;
      this.currentUserRoles=this.currentUser.roles.map(role=>role.name);
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.accountService.loadCurrentUser();
  }

  toggleSidenav(){
    this.sidenavService.showSidenave.pipe(take(1)).subscribe(bool=>
      this.sidenavService.showSidenave.next(!bool));
  }
}
