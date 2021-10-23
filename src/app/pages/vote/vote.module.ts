import { NgModule } from '@angular/core';
import { VoteComponent } from './vote.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: VoteComponent }
]

@NgModule({
  declarations: [
    VoteComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class VoteModule { }
