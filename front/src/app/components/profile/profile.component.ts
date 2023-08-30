import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/model/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username!: string;
  oldPassword!: string;
  newPassword!: string;
  user!: User;

  constructor(private userService: UserService, private service: AuthService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.getUser().subscribe((u: User) => {
      this.user = u;
      console.log(u);
    });
  }

  updateUser() {
    const request = {
      username: this.user.username,
      nomUtilisateur: this.user.nomUtilisateur,
      uMail: this.user.uMail,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };
  
    this.userService.updateProfile(this.user.uId, request)
      .subscribe(
        () => {
          console.log('User updated successfully');
          this.toastr.success('User updated successfully');
        },
        (error) => {
          console.log('Error updating user:', error);
          console.log('Response body:', error.error);
  
          if (error.status === 0) {
            this.toastr.error('An unknown error occurred. Please check your internet connection and try again.');
          } else if (error.status === 401) {
            this.toastr.error('Incorrect old password');
          } else {
            const responseError = JSON.parse(error.error.text);
            this.toastr.error('Error updating user: ' + responseError.message);
          }
        }
      );
  }
  
  

  resetForm() {
    this.username = '';
    this.oldPassword = '';
    this.newPassword = '';
  }
}
