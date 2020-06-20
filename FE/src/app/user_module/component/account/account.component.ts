import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account-service/account.service';
import { Address } from 'src/app/models/address';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  user: User;
  profileForm: FormGroup;
  s: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.s = this.accountService.currentUser$.subscribe((user) => {
      this.user = user;
      this.initForm(user);
    });
  }

  initForm(user: User) {
    this.profileForm = this.formBuilder.group({
      userEmail: [user ? user.userEmail : '', Validators.required],
      userName: [user ? user.userName : '', Validators.required],
      firstName: [user ? user.firstName : '', Validators.required],
      lastName: [user ? user.lastName : '', Validators.required],
      phoneNumber: [user ? user.phoneNumber : '', Validators.required],
    });
  }

  update() {
    console.log(this.profileForm);

    if (this.profileForm.valid) {
      const { firstName, lastName, phoneNumber } = this.profileForm.value;
      this.user = {
        ...this.user,
        firstName,
        lastName,
        phoneNumber,
      } as User;
      this.accountService
        .updateUserProfile(this.user)
        .pipe(take(1))
        .subscribe(
          () => this.snackBar.open('Profile updated successfully', 'Ok', { duration: 2000 }),
          () => this.snackBar.open('Error, try later', 'Ok', { duration: 2000 })
        );
    } else {
      this.snackBar.open('All the fields are required', 'Ok', { duration: 2000 });
    }
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
