import { Component, OnInit } from '@angular/core';
import { IndicesService } from '../shared/services/indices.service';



import { Indice } from './indice';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-indices',
  templateUrl: './show-indices.component.html',
  styleUrls: ['./show-indices.component.scss']
})
export class ShowIndicesComponent implements OnInit {

  public indices: Indice[];
  public indiceSelected: Indice;

  public dataSet: any[];

  public indiceForm: FormGroup;


  constructor(
    private indicesService: IndicesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.indiceForm = this.fb.group({
      indice: [null, []]
    });
    this.getIndices();
    this.changeIndice();

  }


  getIndices() {
    this.indices = [
      {
        "Nombre": "SPCLXIGPA",
        "Valor": 25262.03,
        "Mayor": 25267.57,
        "Menor": 25126.53952593,
        "Medio": 0,
        "Variacion": 0.54
      },
      {
        "Nombre": "SP IPSA",
        "Valor": 4938.5,
        "Mayor": 4939.85,
        "Menor": 4918.792733865,
        "Medio": 0,
        "Variacion": 0.4
      },
      {
        "Nombre": "SPCLXIN10",
        "Valor": 7215.14,
        "Mayor": 7215.14,
        "Menor": 7151.370030059,
        "Medio": 0,
        "Variacion": 0.89
      }
    ];
    // this.indices = [];
    // this.indicesService.getçIndices().subscribe((indices: Indice[]) => {
    //   if (!indices) {
    //     return;
    //   }
    //   this.indices = indices;
    //   this.changeIndice();
    // })

  }

  changeIndice() {
    return this.indiceForm.get('indice').valueChanges.subscribe((nameIndice) => {
      console.log(this.indices);
      if (!nameIndice) {
        return;
      }

      this.indiceSelected = this.indices.find(indice => indice.Nombre = nameIndice);
      this.createData();
    })
  }

  createData() {
    this.dataSet = [];

    Object.keys(this.indiceSelected).forEach((key) => {
      if (['Nombre', 'Variacion', 'Medio'].includes(key)) {
        return;
      }
      let data = { data: [this.indiceSelected[key]], backgroundColor: ['#00EFE8'], label: `Valor ${key}`, };
      this.dataSet.push(data);

    });
  }

}
