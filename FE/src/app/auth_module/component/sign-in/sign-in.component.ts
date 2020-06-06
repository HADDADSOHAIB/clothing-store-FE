import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { User } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }

  login() {
    if(!this.form.valid){
      this.openSnackBar("please fix or fill the red fields");
    }
    else {
      const { email: userEmail, password } = this.form.value;
      this.authService.login({
        userEmail,
        password
      }).pipe(take(1)).subscribe(
        (res) => {
          this.cookieService.set("token", res.token, 30,'/');
          this.openSnackBar("Logged in sucessfully");
          this.accountService.loadCurrentUser();
          this.router.navigate(['/']);
        },
        (err) => {
          if(err.status === 401){
            this.openSnackBar("Incorrect email or password");
          }
          else {
            this.openSnackBar("Error while login");
          }
        }
      );
    }  
  }

  checkValidity(controleName, error) {
    return this.form.get(controleName).touched && this.form.get(controleName).hasError(error);
  }
}
