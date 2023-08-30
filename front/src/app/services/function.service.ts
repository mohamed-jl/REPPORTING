import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleFunction } from 'src/model/ModuleFunction';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  apiUrl = environment.apiUrl


  constructor(private http: HttpClient) { }

  public getAllFunction():Observable<ModuleFunction[]>{
    return this.http.get<ModuleFunction[]>(`${this.apiUrl}/function/list`);
  }
  
  public getFunctionById(id:any):Observable<ModuleFunction>{
    return this.http.get<ModuleFunction>(`${this.apiUrl}/function/find/${id}`);
  }

  public deleteFonction(id:any){
    return this .http.delete(`${this.apiUrl}/function/delete/${id}`)
  }

  public addFonction(fonction:any) {
    return this.http.post(`${this.apiUrl}/function/add`,fonction);
  }
  public updateFonction(id:number,fonction:any){
    return this.http.put(`${this.apiUrl}/function/edit/${id}`,fonction);
  }

  getAllRepRapports(): Observable<any> {
    const url = `${this.apiUrl}/function/rapports`;
    return this.http.get(url);
  }

  assignRepRapportToFunction(functionId: number, repRapportId: number): Observable<any> {
    const url = `${this.apiUrl}/function/${functionId}/reprapports/${repRapportId}`;
    return this.http.put(url, null);
  }

  getRepRapportsByFunctionId(functionId:any) {
    const url = `${this.apiUrl}/function/${functionId}/reprapports`;
   return this.http.get(url)
  }

  removeRepRapportFromFunction(functionId: any, repRapportId: any) : Observable<any>{
   
    const url = `${this.apiUrl}/function/${functionId}/reprapports/${repRapportId}`;
return this.http.delete(url)

  }
  getReportsByFunctionId(functionId:any) {
    const url = `${this.apiUrl}/function/${functionId}/reports`;
   return this.http.get(url)
  }

  updateReportOrderForFunction(functionId: any, repId: any, newOrder: any) {
    const url = `${this.apiUrl}/function/${functionId}/reports/${repId}/order`;
    const body = { newOrder: newOrder };
    return this.http.put(url+ '?newOrder=' + newOrder, null);
}
}
