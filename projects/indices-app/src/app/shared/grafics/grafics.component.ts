import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicesService } from '../services/indices.service';

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.scss']
})
export class GraficsComponent implements OnInit {


  public resultsObservable: Observable<any[]> = this.indicesService.getGrafics$;
  public results: any[];
  @Input() public title: string;
  @Input() public min: number;
  @Input() public max: number;


  view: any = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = false;
  yAxisLabel = '';

  colorScheme = 'nightLights'




  constructor(
    private indicesService: IndicesService
  ) {
    this.resultsObservable.subscribe((results: any[])=>{
      if (!results) {
        return;
      }
      this.results = results;
    })
  }

  ngOnInit(): void {
    console.log(this.results)

  }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



}
