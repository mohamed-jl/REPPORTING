import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cdr } from 'src/model/Cdr';
import { CdrMscOcs } from 'src/model/CdrMscOCs';
import { Filters } from 'src/model/Filters';
import { IxInterResp } from 'src/model/IxInterResp';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  
  apiUrl = environment.chartApi
  api = environment.apiUrl

  constructor(private http : HttpClient) { }
  
  public getChart(id:any):Observable<Object>{
    return this.http.get(`${this.apiUrl}/welcome/rep/`+id);
  }

  public getFunctionChart(id:any):Observable<Object>{
    return this.http.get(`${this.apiUrl}/login/rep/`+id);
  }
  public getTestCharts():Observable<Object>{
    return this.http.get(`${this.apiUrl}/login/rep/`);
  }
  

  public getFunctionChartFiltred(data: Filters):Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    console.log(data.startDate)
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre',data.type_Filter)
      .toString();
  
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    //console.log(body)
    return this.http.post(`${this.apiUrl}/login/rep/`, body, { headers });
  }

  public getFunctionChartFiltredPerHour(data: Filters):Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction.toString())
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre',data.type_Filter)
      .set('startHour',data.startHour)
      .set('endHour',data.endHour)
      .toString();
  
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    //console.log(body)
    return this.http.post(`${this.apiUrl}/login/rep/`, body, { headers });
  }

  public getFunctionChartVariation(data:Filters):Observable<any>{
    // .set('startDate', startDate ? format(startDate).split('/').reverse().join('-') : '')
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set("startDate",data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre',data.type_Filter)
      .toString();
  
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/trunding`, body, { headers });
  }

  public getFunctionChartFiltredForUser(data: Filters):Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre',data.type_Filter)
      .toString();
  
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    console.log("test"+body)
    return this.http.post(`${this.apiUrl}/login/repdash/`, body, { headers });
  }

  public getFunctionChartFiltredForUserPerHours(data: Filters):Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre',data.type_Filter)
      .set('startHour',data.startHour)
      .set('endHour',data.endHour)
      .toString();
  
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/repdash/`, body, { headers });
  }

  public getFunctionChartVariationForUser(data:Filters):Observable<any>{
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre',data.type_Filter)
      .toString();
  
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/trundingtodash`, body, { headers });
  }


  public getDetails(idrep:any,date:any):Observable<any>{
    const body = new HttpParams()
      .set('idrep', idrep)
      .set('date', date)
      .toString();
  
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/rsrReport`, body, { headers });
  }

  public getCdrsInfo():Observable<Cdr>{
    return this.http.get<Cdr>(`${this.api}/cdr/`)
  }

  public getCdrsMSCInfo():Observable<IxInterResp>{
    return this.http.get<IxInterResp>(`${this.api}/cdr/ix_inter/`)
  }
  
  public getCdrsMSC():Observable<CdrMscOcs>{
    return this.http.get<CdrMscOcs>(`${this.api}/cdr/msc_ocs/`)
  }

  public getOperators():Observable<any>{
    return this.http.get<any>(`${this.api}/operators/`)
  }
  
  }
    
