import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/Models/user';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account-service/account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate  {
  currentUser:User;
  isAllowed=false;
  constructor(
    private router:Router,
    private accountService: AccountService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    this.currentUser= this.accountService.getCurrentUserObject();
    this.currentUser.roles.forEach(role=>{
      role.privileges.forEach(Privilege=>{
        if(Privilege.name.includes("PRODUCT"))
          this.isAllowed=true;
      });
    });
    if (this.isAllowed) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

  
}
