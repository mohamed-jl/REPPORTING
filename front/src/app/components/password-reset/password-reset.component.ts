import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'; // Replace with your user service

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  resetPassword() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (this.newPassword === this.confirmPassword) {
      this.userService.resetPassword(token, this.newPassword).subscribe(
        () => {
          alert('Password reset successfully! You can now log in with your new password.');
          this.router.navigate(['/login']); 
        },
        (error) => {
          console.error('Error resetting password', error);
          alert('Error resetting password. Please try again later.');
        }
      );
    } else {
      alert('Passwords do not match. Please make sure they match.');
    }
  }
}
