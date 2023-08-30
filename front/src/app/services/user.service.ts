import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl

  public updateUser(user: any) :Observable<Object>{
    return this.http.put(`${this.apiUrl}/user/edit`,user);
  }

  constructor(private http : HttpClient) { }

  public getAllUsers ():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }

  public deleteUser(id:any){
    return this.http.delete(`${this.apiUrl}/user/delete/`+id)
  }

  public addUser(user:any):Observable<Object>{
    return this.http.post(`${this.apiUrl}/user/add`,user);
  }

  public assignRapport(id:any,rapports:any):Observable<Object>{
    return this.http.post(`${this.apiUrl}/user/assign/`+id,rapports);
  }

  public detacheRapport(id:any,rapports:any):Observable<Object>{
    return this.http.post(`${this.apiUrl}/user/detach/`+id,rapports);
  }

  public addToDashboard(userId:any,rapId:any):Observable<Object>{
    return this.http.put(`${this.apiUrl}/user/assignbyid/${userId}/${rapId}`,null)
  }

  public removeFromDashboard(userId:any,rapId:any):Observable<Object>{
    return this.http.put(`${this.apiUrl}/user/removerapport/${userId}/${rapId}`,null)
  }

  getReportsByUserId(userId:any) {
    const url = `${this.apiUrl}/user/${userId}/reports`;
   return this.http.get(url)
  }

  updateReportOrderForUser(userId: any, repId: any, newOrder: any) {
    const url = `${this.apiUrl}/user/${userId}/reports/${repId}/order`;
    const body = { newOrder: newOrder };
    return this.http.put(url+ '?newOrder=' + newOrder, null);
}
updatePassword(username: any, oldPassword: any, newPassword: any) {
  const url = `${this.apiUrl}/user/${username}/password`;
  const params = {
    oldPassword: oldPassword,
    newPassword: newPassword
  };

  console.log('URL:', url); // Add this line to check the URL
  console.log('Params:', params); // Add this line to check the parameters


  return this.http.put<any>(url, null, { params: params });

}

updateProfile(id:any,request:any){
  return this.http.put(`${this.apiUrl}/user/update/${id}/`,request)
}

existUser(mail:any):Observable<boolean>{
  console.log('in existUser..mail='+mail);
  const url=`${this.apiUrl}/user/exist/${mail}`;
  console.log(this.http.get<boolean>(url))
  return this.http.get<boolean>(url);
}

userByEmail(mail:any){
  return this.http.get(`${this.apiUrl}/user/Bymail/${mail}`)
}

resetPassword(token: any, newPassword: string): Observable<any> {
  const url = `${this.apiUrl}/reset-password`;
  console.log(url)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  const requestData = {
    token: token,
    newPassword: newPassword
  };
  console.log("sending reset request")

  return this.http.post(url, requestData, httpOptions);
}
}
