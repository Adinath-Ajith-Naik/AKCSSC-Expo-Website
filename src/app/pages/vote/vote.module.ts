import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VoteComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class VoteModule { }
