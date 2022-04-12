import { Component, OnInit } from '@angular/core';
import { IndicesService } from '../shared/services/indices.service';

@Component({
  selector: 'app-show-indices',
  templateUrl: './show-indices.component.html',
  styleUrls: ['./show-indices.component.scss']
})
export class ShowIndicesComponent implements OnInit {

  constructor(
    private indicesService: IndicesService,
  ) { }

  ngOnInit(): void {
    this.indicesService.getçIndices().subscribe((resp: any)=>{
      console.log(resp);
    })
  }

}
