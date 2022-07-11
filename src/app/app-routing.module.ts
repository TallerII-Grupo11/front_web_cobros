import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Home
  { path: '', loadChildren: () => import('./components/pages/login/login.module').then(m => m.LoginModule), data: { breadcrumb: "Login" } },
  // Home
  { path: 'login', loadChildren: () => import('./components/pages/login/login.module').then(m => m.LoginModule), data: { breadcrumb: "Login" } },
  //Menu
  { path: 'fiubacoins/compra', loadChildren: () => import('./components/pages/facturacion/monto/facturacion.module').then(m => m.FacturacionModule), data: { breadcrumb: "FiubaCoins" } },
  { path: 'fiubacoins/pago', loadChildren: () => import('./components/pages/facturacion/pago/pago.module').then(m => m.PagoModule), data: { breadcrumb: "FiubaCoins" } },
  { path: 'gracias', loadChildren: () => import('./components/pages/finalizacion/finalizacion.module').then(m => m.FinalizacionModule), data: { breadcrumb: "Gracias" } },
  { path: 'error', loadChildren: () => import('./components/pages/errorPago/error-pago.module').then(m => m.ErrorPagoModule), data: { breadcrumb: "Error" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
