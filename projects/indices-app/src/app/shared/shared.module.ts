import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraficsComponent } from './grafics/grafics.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    GraficsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgChartsModule,

  ],
  exports:[
    GraficsComponent
  ]
})
export class SharedModule { }
