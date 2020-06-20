import { Injectable } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private accountService: AccountService, private router: Router, private snackBar: MatSnackBar) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user && user.role.includes('admin')) {
          return true;
        } else {
          this.snackBar.open('Only admins are allowed', 'Ok');
          this.router.navigate(['auth', 'signin']);
          return false;
        }
      })
    );
  }
}
