import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FinalizacionRoutingModule } from './finalizacion-routing.module';
import { FinalizacionComponent } from './finalizacion.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@NgModule({
  declarations: [FinalizacionComponent, ContentComponent],
  imports: [
    CommonModule,
    FinalizacionRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    PerfectScrollbarModule,
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
export class FinalizacionModule { }
