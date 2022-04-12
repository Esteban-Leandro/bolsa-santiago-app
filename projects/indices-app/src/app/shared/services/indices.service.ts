import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicesService {

  constructor(
    private http: HttpClient,
  ) { }


  getçIndices(){
    return this.http.post('https://startup.bolsadesantiago.com/api/consulta/TickerOnDemand/getIndices?access_token=C96DEA4C3D764142901DA2BC707CC118',{})
      .pipe(
        map((resp:any)=>{
          return resp.listaResult;
        }),
        catchError(err=>of(null))
      )
  }
}
