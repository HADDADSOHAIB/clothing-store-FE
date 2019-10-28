import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../Model/credentials';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from '../../custom-validators/password-must-match';
import { mustContainUpperCase, mustContainNumber, mustContainLowerCase, mustContainSpecialCaracter } from '../../custom-validators/password-pattern';
import { AuthService } from '../../service/auth-service/auth.service';
import { take } from 'rxjs/Operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  credentials: Credentials;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  emailOk:boolean=false;
  accountCreatedResult:string="";
  accountCreated:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {  }

  ngOnInit() {
    this.emailForm=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]]
    });

    this.passwordForm=this.formBuilder.group({
      password: ['',[Validators.required,Validators.minLength(6),
        mustContainUpperCase,mustContainNumber,mustContainLowerCase,
        mustContainSpecialCaracter]],
      confirmPassword: ['',Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  checkEmail(){
    this.authService.checkEmail(this.emailForm.get('email').value)
      .pipe(take(1)).subscribe(resp=>{
        console.log(resp);
        this.emailOk?this.openSnackBar('Email is Ok'):this.openSnackBar('There is already an account with this email');
      },
      error=>{
        console.log(error);
        this.openSnackBar('unexpected error');
      });
  }

  createAccount(){
    this.credentials=new Credentials(
      this.emailForm.get('email').value,
      this.passwordForm.get('password').value
    );

    this.authService.createAccount(this.credentials)
      .pipe(take(1)).subscribe(resp=>{
        this.accountCreatedResult=resp;
      },
      error=>{
        console.log(error);
        this.accountCreatedResult='unexpected error';
      });
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000
  });
  }

  routeToHome(){
    this.router.navigate(["/"]);
  }
}
