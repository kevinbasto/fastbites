import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstTimeComponent } from './first-time.component';

const routes: Routes = [
  {
    path: '',
    component: FirstTimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstTimeRoutingModule { }
