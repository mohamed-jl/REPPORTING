import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FunctionService } from 'src/app/services/function.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/model/User';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-rapports',
  templateUrl: './user-rapports.component.html',
  styleUrls: ['./user-rapports.component.css']
})
export class UserRapportsComponent implements OnInit {

  allRapports: any[] = [];
  selectedRapports: any[] = [];
  users: User[] = [];
  selectedUser: User | null = null;
  userInput = new FormControl();
  filteredUsers!: Observable<User[]>;

  constructor(private funcService: FunctionService, private userService: UserService,private dialogRef: MatDialogRef<UserRapportsComponent>,) { 
    // initialize filteredUsers
    this.filteredUsers = this.userInput.valueChanges.pipe(
      startWith(''),
      map(value => this.filterUsers(value))
    );
  }


  ngOnInit(): void {
    this.funcService.getAllRepRapports().subscribe((data: any) => {
      this.allRapports = data;
    });
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  submit(){
    console.log(this.selectedRapports)
    console.log(this.selectedUser)
    this.userService.assignRapport(this.selectedUser?.uId,this.selectedRapports).subscribe(() => {
      console.log('RepRapports assigned successfully!');
      this.closeDialog();
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  private filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.username.toLowerCase().includes(filterValue));
  }
  
  displayUser(user: User): string {
    return user ? user.username : '';
  }

}
