import { Component, OnInit } from '@angular/core';
import { IndicesService } from '../shared/services/indices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Indice } from './indice';
import { SwalalertService } from '../shared/services/swalalert.service';

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
    private swalalertService: SwalalertService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.accessForm = this.fb.group({
      accessKey: [null, [Validators.required]]
    });
    this.indiceForm = this.fb.group({
      nombre: [null, []]
    });
  }

  validForm(form: FormGroup): boolean {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          this.validForm(control)
        }
        control.markAsTouched();
      })
    }
    return form.valid;
  }

  isValid(form: FormGroup, control: string){
    return form.get(control).valid && form.get(control).touched;
  }

  isInValid(form: FormGroup, control: string){
    return form.get(control).invalid && form.get(control).touched;
  }


  getIndices() {
    this.swalalertService.proccessSwal();
    if (!this.validForm(this.accessForm)) {
      return this.swalalertService.showError('Error','Formualrio incorrecto vuelve a intentar');
    }
    this.indices = null;
    this.indicesService.getçIndices(this.accessForm.get('accessKey').value).subscribe((indices: Indice[]) => {
      if (!indices) {
        return this.swalalertService.showError('Error','Acceso denegado por favor vuelve a intentar');
      }
      this.indices = indices;

      this.swalalertService.showConfirm('Acceso Correcto', 'Ya puedes ingresar', 'continaur', 'success');
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
