  import { Component, Inject, OnInit } from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { Observable } from 'rxjs';
  import { User } from '../../../model/User';
  import { group_module } from '../../../model/group_module';
  import { UserService } from '../../services/user.service';
  import { GroupModuleService } from '../../services/group-module.service';
import { Role } from 'src/model/Role';

  @Component({
    selector: 'user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.css']
  })
  export class UserDialogComponent implements OnInit {
    user!: User;
    selectedRole!:Role;
    selectedGroup: group_module | null = null;
    groups$: Observable<group_module[]> | undefined;
    etatOptions = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' }
    ];
    roles = [
      {id:1,role:'Admin'},
      {id:2,role:'User'}
    ]
    
    constructor(
      private userService: UserService,
      private grpService:GroupModuleService,
      private dialogRef: MatDialogRef<UserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any
    ) { }

    ngOnInit(): void {
      this.groups$ = this.grpService.getGroup();
      console.log(this.selectedGroup);
      console.log(this.data)
      if (this.data && this.data.user_group) {
        this.user = { ...this.data };
        this.selectedGroup = this.data.user_group
      } else {
        this.user = {
          uId: 0,
          username: '',
          dateCreation: new Date(),
          dateModif: new Date(NaN),
          etat: '',
          idCreateur: 0,
          nomUtilisateur: '',
          uDepart: '',
          uLogin: '',
          uMail: '',
          uMatricule: '',
          password: '',
          user_group: null,
          role: null
        };
      }
    }

    saveUser(): void {
      const currentDate = new Date();
      if (this.data.user) {
        this.user.dateModif = currentDate;
        this.userService.updateUser(this.user).subscribe(result => {
          this.dialogRef.close(result);
        });
      } else {
        this.user.user_group = this.selectedGroup!;
        this.user.role = this.selectedRole;
        this.userService.addUser(this.user).subscribe(result => {
          this.dialogRef.close(result);
        });
      }
    }

    cancel(): void {
      this.dialogRef.close();
    }

    onGroupSelectionChange(selectedGroup: group_module): void {
      this.selectedGroup = selectedGroup;
    }

    compareGroupFn(group1: group_module, group2: group_module): boolean {
      return group1 && group2 ? group1.gId === group2.gId : group1 === group2;
    }
    
    
  }
