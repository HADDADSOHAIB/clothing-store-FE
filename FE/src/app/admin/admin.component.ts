import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav-service/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  showSidenav:boolean=true;

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.sidenavService.showSidenave.subscribe(bool=>this.showSidenav=bool);
  }
}