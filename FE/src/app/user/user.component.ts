import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav-service/sidenav.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  showSidenav:boolean=true;

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.sidenavService.showSidenave.subscribe(bool=>this.showSidenav=bool);
  }

}
