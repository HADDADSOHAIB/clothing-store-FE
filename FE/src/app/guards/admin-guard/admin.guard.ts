import { Injectable } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  
  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.accountService.getCurrentUser().pipe(map(user=>{
      if(user.roles.map(role=>role.name).includes('Admin'))
        return true;
      else{
        this.snackBar.open("Only admins are allowed","Ok");
        this.router.navigate(["auth","signin"]);
        return false;
      }
    }))
  }
}
