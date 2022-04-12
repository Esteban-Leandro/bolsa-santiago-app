import { Component, OnInit } from '@angular/core';
import { IndicesService } from '../shared/services/indices.service';



import { Indice } from './indice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-indices',
  templateUrl: './show-indices.component.html',
  styleUrls: ['./show-indices.component.scss']
})
export class ShowIndicesComponent implements OnInit {

  public indices: Indice[];
  public indiceSelected: Indice;
  public min: number;
  public max: number;

  public accessForm:FormGroup;
  public indiceForm: FormGroup;


  constructor(
    private indicesService: IndicesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.accessForm = this.fb.group({
      accessKey: [null, [Validators.required]]
    });
    this.indiceForm = this.fb.group({
      nombre: [null, []]
    });
    this.getIndices();
    this.changeIndice();



  }

  isValid(form: FormGroup, control: string){
    return form.get(control).valid && form.get(control).touched;
  }

  isInValid(form: FormGroup, control: string){
    return form.get(control).invalid && form.get(control).touched;
  }


  getIndices() {
    if (!this.accessForm.valid) {
      return;
    }
    // this.indices = [
    //   {
    //     "Nombre": "SPCLXIGPA",
    //     "Valor": 25262.03,
    //     "Mayor": 25267.57,
    //     "Menor": 25126.53952593,
    //     "Medio": 0,
    //     "Variacion": 0.54
    //   },
    //   {
    //     "Nombre": "SP IPSA",
    //     "Valor": 4938.5,
    //     "Mayor": 4939.85,
    //     "Menor": 4918.792733865,
    //     "Medio": 0,
    //     "Variacion": 0.4
    //   },
    //   {
    //     "Nombre": "SPCLXIN10",
    //     "Valor": 7215.14,
    //     "Mayor": 7215.14,
    //     "Menor": 7151.370030059,
    //     "Medio": 0,
    //     "Variacion": 0.89
    //   }
    // ];
    this.indices = [];
    this.indicesService.getçIndices(this.accessForm.get('accessKey').value).subscribe((indices: Indice[]) => {
      if (!indices) {
        return;
      }
      this.indices = indices;
      this.changeIndice();
    })

  }

  changeIndice() {
    return this.indiceForm.get('nombre').valueChanges.subscribe((indiceName) => {
      if (!indiceName) {
        return;
      }
      let indice = this.indices.find(i=> i.Nombre === indiceName)
      this.indiceSelected = indice;
      this.createData();
    })
  }

  createData() {
    this.min = (this.indiceSelected.Menor - 100);
    this.max = (this.indiceSelected.Mayor + 100);
    let results = [
      {
        "name": "Valor Mínimo",
        value: this.indiceSelected.Menor
      },

      {
        "name": "Valor Actual",
        value: this.indiceSelected.Valor
      },

      {
        "name": "Valor Máximo",
        value: this.indiceSelected.Mayor
      },
    ];
    this.indicesService.emitNewgrafic(results);
    // this.dataSet = this.indices.map(indice => {
    //   console.log('(indice.Valor)', (indice.Valor));
    //   console.log('Math.ceil(indice.Valor)', Math.ceil(indice.Valor));
    //   let data = [

    //     {
    //       "name": "Valor Mínimo",
    //       "value": indice.Menor,
    //     },
    //     {
    //       "name": "Valor Actual",
    //       "value": indice.Valor,
    //     },
    //     {
    //       "name": "Valor Máximo",
    //       "value": indice.Mayor,
    //     }
    //   ]




    //   return data;
    // })


  }

}
