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
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  roleList:Role[]=[];
  privilegeList:Privilege[]=[];
  privilegeFilteredList:Privilege[]=[];
  selectedRole:Role=new Role(0,"",[]);
  newRole:Role=new Role(0,"",[]);
  showPrivilegeList:boolean=false;
  userList:User[]=[];
  displayedColumns: string[] = ['UserEmail', 'Roles','Options'];
  constructor(
    private roleService: RoleService,
    private snackBar:MatSnackBar,
    private accountService:AccountService
  ) { }

  ngOnInit() {
    this.roleService.getRoles().pipe(take(1)).subscribe(roles=>{
      this.roleList=roles;
    });
    this.roleService.getPrivileges().pipe(take(1)).subscribe(privileges=>{
      this.privilegeList=privileges;
    });
    this.accountService.getAllUsers().pipe(take(1)).subscribe(users=>{
      this.userList=users;
    })
  }

  selectRole(roleId:number){
    this.selectedRole=this.roleList.find(role=>role.id===roleId);
    this.showPrivilegeList=true;
    this.filterPrivilegeList();
  }

  deletePrivilege(privilegeId:number){
    if(this.selectedRole.name.toUpperCase()=="ADMIN" || this.selectedRole.name.toUpperCase()=="USER"){
      this.snackBar.open("You can't modify the "+this.selectedRole.name+" ","Ok");
    }
    else{
      let index=this.selectedRole.privileges.indexOf(this.selectedRole.privileges.find(privilege=>privilege.id===privilegeId));
      this.selectedRole.privileges.splice(index,1);
      this.roleService.updateRole(this.selectedRole).pipe(take(1))
        .subscribe(privilege=>console.log("succes"),error=>console.log(error));
      this.filterPrivilegeList();
    }
  }

  addPrivilege(privilegeId:number){
    if(this.selectedRole.name.toUpperCase()=="ADMIN" || this.selectedRole.name.toUpperCase()=="USER"){
      this.snackBar.open("You can't modify the "+this.selectedRole.name+" role","Ok");
    }
    else{
      let privilege=this.privilegeList.find(privilege=>privilege.id===privilegeId);
      this.selectedRole.privileges.push(privilege);
      this.roleService.updateRole(this.selectedRole).pipe(take(1))
        .subscribe(privilege=>console.log("succes"),error=>console.log(error));
      this.filterPrivilegeList();
    }
  }

  createRole(){
    this.roleService.createRole(this.newRole).pipe(take(1)).subscribe(role=>{
      this.snackBar.open("The role "+role.name+" added success","Ok");
      this.newRole=new Role(0,"",[]);
      this.roleService.getRoles().pipe(take(1)).subscribe(roles=>this.roleList=roles);
    },
    error=>{
      console.log(error);
      this.snackBar.open("error try later","Ok");
    })
  }

  private filterPrivilegeList(){
    this.privilegeFilteredList=[];
    this.privilegeList.forEach(privilege=>{
      if(!this.selectedRole.privileges.find(priv=>priv.id===privilege.id))
        this.privilegeFilteredList.push(privilege);
    });
  }
}
