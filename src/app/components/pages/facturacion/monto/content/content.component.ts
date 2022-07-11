import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { ToastrService } from 'ngx-toastr';

declare let MercadoPago: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  constructor(
    private sessionService: SessionService,
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router
  ) { }

  public cantidadFiubaCoins;
  public invalidFormPrecio = false;
  
  ngOnInit(): void {
  }

  public validarPrecio() {
    if(!this.cantidadFiubaCoins) {
      this.invalidFormPrecio = true;
      return false;
    } else {
      this.invalidFormPrecio = false;
      return true;
    }
  }

  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public confirmarPago() {
    if(this.validarPrecio()) {
      this.sessionService.setMontoAPagar(this.cantidadFiubaCoins);
      this.router.navigate(['fiubacoins/pago'], { queryParams: {token: this.sessionService.getToken(), wallet: this.sessionService.getWallet(), amount: this.cantidadFiubaCoins}});
    } else {
      this.toast.error("Ingresa un monto valido de FiubaCoins", '', {
        positionClass: 'toast-top-left',
        progressBar: true
      });
    }
  }

}