import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPagoRoutingModule } from './error-pago-routing.module';
import { ErrorPagoComponent } from './error-pago.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [ErrorPagoComponent, ContentComponent],
  imports: [
    CommonModule,
    ErrorPagoRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    PerfectScrollbarModule
  ],
  providers: [
  ]
})
export class ErrorPagoModule { }
