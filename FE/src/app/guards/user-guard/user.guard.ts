import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account-service/account.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.accountService.getCurrentUser().pipe(map(user => {
      if (user.roles.map(role => role.name).includes('User')) {
        return true;
      } else {
        this.snackBar.open('Only users are allowed', 'Ok');
        this.router.navigate(['auth', 'signin']);
        return false;
      }
    }));
  }
}
