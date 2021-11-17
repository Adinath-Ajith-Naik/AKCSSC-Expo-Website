import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class SharedModule {}
