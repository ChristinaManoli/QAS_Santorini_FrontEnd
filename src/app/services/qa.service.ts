import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QaService {

  constructor(private http:HttpClient) { }

  Question_Answering_System(data: any){
    const url = 'http://localhost:5000/api/QASantorini';
  
    const headers =  new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('crossDomain', 'true');
    
    const jsonObject: { [key: string]: any } = {
      argument: data
    };
    return this.http.post(url, jsonObject, {headers:headers});
  }
}
