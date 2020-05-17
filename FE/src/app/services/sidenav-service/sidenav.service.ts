import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SidenavService {
	showSidenave: BehaviorSubject<boolean> = new BehaviorSubject(true);
	constructor() { }
}
