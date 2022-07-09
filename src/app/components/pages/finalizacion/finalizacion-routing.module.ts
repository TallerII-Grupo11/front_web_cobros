import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizacionComponent } from './finalizacion.component';

const routes: Routes = [{ path: '', component: FinalizacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalizacionRoutingModule { }
