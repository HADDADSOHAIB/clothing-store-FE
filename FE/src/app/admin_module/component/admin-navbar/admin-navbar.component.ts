import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';

@Component({
	selector: 'admin-navbar',
	templateUrl: './admin-navbar.component.html',
	styleUrls: ['./admin-navbar.component.scss']
})
export class AdminHeaderComponent implements OnInit {

	constructor(
		private sidenavService: SidenavService
	) { }

	ngOnInit() {
	}

	closeSidenave() {
		this.sidenavService.showSidenave.next(false);
	}
}
