import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicesService {

  private grafics: any[] = null;
  private grafics$: BehaviorSubject<any[]> = new BehaviorSubject(this.grafics);

  constructor(
    private http: HttpClient,
  ) { }


  getçIndices(accessKey:string){
    return this.http.post(`https://startup.bolsadesantiago.com/api/consulta/TickerOnDemand/getIndices?access_token=${accessKey}`,{})
      .pipe(
        map((resp:any)=>{
          return resp.listaResult;
        }),
        catchError(err=>of(null))
      )
  }

  get getGrafics$(){
    return this.grafics$.asObservable();
  }

  emitNewgrafic(grafics: any[]){
    this.grafics = grafics;

    this.grafics$.next(this.grafics);
  }
}
