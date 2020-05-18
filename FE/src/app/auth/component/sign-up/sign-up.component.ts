import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../custom-validators/password-must-match';
import {
  mustContainUpperCase,
  mustContainNumber,
  mustContainLowerCase,
  mustContainSpecialCaracter,
} from '../../custom-validators/password-pattern';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  credentials: Credentials;
  form: FormGroup;
  emailOk = false;
  emailDisabled = false;
  accountCreated = false;
  creationResult$: Subject<string> = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        userEmail: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        firstName: [''],
        lastName: [''],
        phoneNumber: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'passwordConfirmation'),
      }
    );
  }

  // checkEmail() {
  // 	this.credentials = new Credentials(
  // 		this.emailForm.get('email').value,
  // 		this.passwordForm.get('password').value
  // 	);
  // 	this.authService.checkEmail(this.credentials)
  // 		.pipe(take(1)).subscribe(resp => {
  // 			this.emailOk = true;
  // 			this.emailDisabled = true;
  // 			this.openSnackBar('email OK');
  // 		},
  // 		error => {
  // 			console.log(error);
  // 			this.emailOk = false;
  // 			this.openSnackBar('Email Not OK');
  // 		});
  // }

  changeEmail() {
    this.emailOk = false;
    this.emailDisabled = false;
  }
  createAccount() {
    // this.credentials = new Credentials(
    // 	this.emailForm.get('email').value,
    // 	this.passwordForm.get('password').value
    // );

    if (!this.emailOk) {
      this.openSnackBar('Email is not Ok');
    } else {
      this.authService
        .createAccount(this.credentials)
        .pipe(take(1))
        .subscribe(
          (resp) => {
            this.accountCreated = true;
            localStorage.setItem('token', resp.token);
            this.creationResult$.next('Account created, un email is sent to your inbox for verification');
          },
          (error) => {
            console.log(error);
            this.accountCreated = false;
            this.creationResult$.next('Unexpected error, please check your internet connection or try later');
          }
        );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }

  routeToHome() {
    this.router.navigate(['/']);
  }

  checkValidity(controleName, error) {
    return this.form.get(controleName).touched && this.form.get(controleName).hasError(error);
  }
}
