import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog.component';

@NgModule({
  declarations: [
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CatalogModule { }
