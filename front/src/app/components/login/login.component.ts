import { Component, OnInit ,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/model/User';
import { Login } from 'src/model/login';
import { data } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  infos!: Login;
  user!: User;
  invalidLogin: boolean = false;
  reset:boolean=false;
  //@Output() dataEmiter= new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
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
      role : null
    
    }
    
    // Redirect to dashboard if already logged in
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      this.router.navigate(['/']);
    }
  }


  login() {
    if (this.user.username === '' || this.user.password === '') {
      this.toastr.error('Please fill in both username and password fields.');
      return;
    }
    this.authService.generateToken2(this.user).subscribe((resp:any)=>{
      if(this.cookieService.get('jwtToken')){
        this.toastr.success('Success.');
        this.router.navigate(['/'])
        this.reloadPage()
      }
    }, error => {
      this.invalidLogin = true;
      this.toastr.error('Invalid username or password.');
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

 /*  passReset(){
    this.reset=!this.reset;
    this.dataEmiter.emit(this.reset);
  } */
} 
