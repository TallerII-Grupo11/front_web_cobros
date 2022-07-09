import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent, ContentComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    ToastrModule.forRoot({
      closeButton: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-left",
      preventDuplicates: false,
    })
  ],
  providers: [
    UserService
  ]
})
export class LoginModule { }
