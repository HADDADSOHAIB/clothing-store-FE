import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { constructor } from 'q';
import { AccountService } from 'src/app/shared/services/account-service/account.service';
import { User } from 'src/app/shared/Models/user';
import { Privilege } from 'src/app/shared/Models/privilege';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate  {
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
        if(Privilege.name.includes("CATEGORY"))
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
