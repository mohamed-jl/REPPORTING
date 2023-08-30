import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { User } from 'src/model/User';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl
  uuser!:User
  setUser(user: User) {
    this.uuser = user;
  }
  userToSave  = new EventEmitter<User>()

  constructor(private httpClient: HttpClient,private cookieService:CookieService,private userService : UserService,private router: Router) { }


  public generateToken(request: any) {
    return this.httpClient.post(`${this.apiUrl}/token/generate-token`,  request,{ observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization');
        if (token) {
          this.cookieService.set('jwtToken', token);
          // this.router.navigate(['/']);
        }
      },
      error => console.error(error)
    );
  }

  public generateToken2(request: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/token/generate-token`, request, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization');
        if (token) {
          this.cookieService.set('jwtToken', token);
          console.log(this.cookieService.get('jwtToken'));
        }
        return response.body;
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  
  

  checkToken(): Observable<boolean> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    console.log(headers)
    return this.httpClient.get<boolean>(`${this.apiUrl}/check?token=${token}`);
  }

  getUser():Observable<User>{
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpClient.get<User>(`${this.apiUrl}/loginResp?token=${token}`);
  }

  getToken() {
    return this.cookieService.get('jwtToken');
    //return true;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      // return !this.isTokenExpired(token);
      return true;
    }
    return false;
  }

}
