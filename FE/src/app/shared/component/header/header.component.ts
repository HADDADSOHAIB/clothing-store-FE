import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account-service/account.service';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';
import { take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser$: BehaviorSubject<User>;

  constructor(
    private accountService: AccountService,
    private sidenavService: SidenavService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.cookieService.delete("token");
    this.accountService.currentUser$.next(undefined);
  }

  toggleSidenav() {
    this.sidenavService.showSidenave.pipe(take(1)).subscribe((bool) => this.sidenavService.showSidenave.next(!bool));
  }
}
