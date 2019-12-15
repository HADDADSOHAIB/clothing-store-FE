import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav-service/sidenav.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  showSidenav:boolean=true;

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.sidenavService.showSidenave.subscribe(bool=>this.showSidenav=bool);
  }

}
