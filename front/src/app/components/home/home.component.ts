import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  authRequest:any={
    "username":"test",
    "password":"test"
  };

  response:any;
  jwtoken!:String;

  constructor(private service:AuthService,private httpClient: HttpClient,private cookieService:CookieService,private router :Router) { }

  ngOnInit() {
    this.getAccessToken(this.authRequest);
    if (!this.service.isAuthenticated()){
      this.router.navigate(['/test']);
    }else{
      this.router.navigate(['/']);
    }
  }

  public getAccessToken(authRequest:any){
      return this.httpClient.post("http://localhost:9998/token/generate-token",  authRequest,{ observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          const token = response.headers.get('Authorization');
          if (token) {
            this.cookieService.set('jwtToken', token);
            this.jwtoken = this.cookieService.get('jwtToken');
          }
        },
        error => console.error(error)
      );
    }
  }

