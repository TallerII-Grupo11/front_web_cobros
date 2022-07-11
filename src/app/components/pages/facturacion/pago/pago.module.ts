import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PagoRoutingModule } from './pago-routing.module';
import { PagoComponent } from './pago.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@NgModule({
  declarations: [PagoComponent, ContentComponent],
  imports: [
    CommonModule,
    PagoRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    PerfectScrollbarModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-left",
      preventDuplicates: false,
    }),
  ],
  providers: [
    UserService
  ]
})
export class PagoModule { }
