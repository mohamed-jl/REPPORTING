import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  apiUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }

  sendEmail(emailData: any): Observable<any> {
    const url = `${this.apiUrl}/send-email`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(emailData)
    this.http.post(url, emailData, httpOptions)
  .subscribe(
    response => {
      // Handle success
      console.log('sent')
    },
    error => {
      console.error('Error sending POST request:', error);
    }
  );

    return this.http.post(url,emailData);
    
  }

  sendResetLink(email:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/html'
      })
    };
     return this.http.post(`${this.apiUrl}/send-reset-email`,email,httpOptions)
    
  }
}
