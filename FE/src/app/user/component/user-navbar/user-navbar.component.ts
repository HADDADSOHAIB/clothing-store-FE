import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';


@Component({
  selector: 'user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserHeaderComponent implements OnInit {

  constructor(
    private sidenaveService: SidenavService
  ) { }

  ngOnInit() {
  }

  closeNavbar() {
    this.sidenaveService.showSidenave.next(false);
  }
}
