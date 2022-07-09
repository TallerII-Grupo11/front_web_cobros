import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot({
      progressBar: true,
      enableHtml: true,
      preventDuplicates: true,
    }),
  ]
})
export class CoreModule { }
