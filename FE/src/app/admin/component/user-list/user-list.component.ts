import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/Models/role';
import { Privilege } from 'src/app/shared/Models/privilege';
import { RoleService } from '../../service/role-service/role.service';
import { take } from 'rxjs/operators';

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
  showPrivilegeList:boolean=false;
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.roleService.getRoles().pipe(take(1)).subscribe(roles=>{
      this.roleList=roles;
      console.log(this.roleList);
    });
    this.roleService.getPrivileges().pipe(take(1)).subscribe(privileges=>{
      this.privilegeList=privileges;
      console.log(this.privilegeList);
    });
  }

  selectRole(roleId:number){
    this.selectedRole=this.roleList.find(role=>role.id===roleId);
    this.showPrivilegeList=true;
    this.filterPrivilegeList();
  }

  deletePrivilege(privilegeId:number){
    let index=this.selectedRole.privileges.indexOf(this.selectedRole.privileges.find(privilege=>privilege.id===privilegeId));
    this.selectedRole.privileges.splice(index,1);
    this.filterPrivilegeList();
  }

  addPrivilege(privilegeId:number){
    let privilege=this.privilegeList.find(privilege=>privilege.id===privilegeId);
    this.selectedRole.privileges.push(privilege);
    this.filterPrivilegeList();
  }

  private filterPrivilegeList(){
    this.privilegeFilteredList=[];
    this.privilegeList.forEach(privilege=>{
      if(this.selectedRole.privileges.indexOf(privilege)==-1)
        this.privilegeFilteredList.push(privilege);
    });
  }
}
