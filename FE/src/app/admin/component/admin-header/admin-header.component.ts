import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private sidenavService:SidenavService
  ) { }

  ngOnInit() {
  }

  closeSidenave(){
    this.sidenavService.showSidenave.next(false);
  }
}
