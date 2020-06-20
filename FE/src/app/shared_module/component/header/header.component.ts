import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account-service/account.service';
import { SidenavService } from 'src/app/services/sidenav-service/sidenav.service';
import { take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$: BehaviorSubject<User>;
  userCart$: BehaviorSubject<Cart>;
  s:Subscription;

  constructor(
    private accountService: AccountService,
    private sidenavService: SidenavService,
    private cookieService: CookieService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
    
    this.s = this.currentUser$.subscribe(
      (user) => {
        if(user){
          this.cartService.getCartByUser(user.id).pipe(take(1)).subscribe(
            (cart) => this.cartService.userCart$.next(cart)
          );
        }
        else {
          this.cartService.userCart$.next(new Cart(null, null, []));
        }
      }
    );

    this.userCart$ = this.cartService.userCart$;
  }

  logout() {
    this.cookieService.delete('token');
    this.accountService.currentUser$.next(undefined);
  }

  toggleSidenav() {
    this.sidenavService.showSidenave.pipe(take(1)).subscribe((bool) => this.sidenavService.showSidenave.next(!bool));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
