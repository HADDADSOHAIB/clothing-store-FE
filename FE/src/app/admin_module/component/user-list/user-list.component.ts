import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteConfigLoadEnd } from '@angular/router';
import { Role } from 'src/app/models/role';
import { Privilege } from 'src/app/models/privilege';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role-service/role.service';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: User[] = [];

  displayedColumns: string[] = ['First Name', 'Last Name', 'Phone Number', 'UserEmail', 'Roles', 'Options'];
  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.accountService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.userList = users;
        console.log(users);
      });
  }

  upgradeToAdmin(userEmail: String) {
    this.roleService
      .upgradeUser(userEmail)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.accountService
            .getAllUsers()
            .pipe(take(1))
            .subscribe((users) => {
              this.userList = users;
            });
        },
        (error) => console.log(error)
      );
  }

  getRoles(id: number) {
    // return this.userList.find(user => user.id === id).roles.map(role => role.name).join(', ');
  }
}
