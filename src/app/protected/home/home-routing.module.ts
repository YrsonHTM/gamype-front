import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeprotectedComponent } from './components/homeprotected/homeprotected.component';

const routes: Routes = [{
  path: '',
  component: HomeprotectedComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
