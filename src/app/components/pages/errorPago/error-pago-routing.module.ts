import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPagoComponent } from './error-pago.component';

const routes: Routes = [{ path: '', component: ErrorPagoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorPagoRoutingModule { }
