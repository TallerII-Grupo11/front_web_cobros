import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private toast: ToastrService,
    private sessionService: SessionService
  ) { }

  public pagoExitoso: boolean = false;
  public errorPago: boolean = false;
  public cantidadFiubaCoins: number;
  public token: string;
  public wallet: string;

  ngOnInit(): void {
    this.confirmarPago();
  }

  public confirmarPago(): void {
    this.userService.transferFiubaCoins().subscribe((res: any) => {
      if(res.hash) {
        this.pagoExitoso = true;
        this.toast.success("La compra de FiubaCoins fue realizada con exito!", '', {
          positionClass: 'toast-top-left',
          progressBar: true
        });
      } else {
        this.errorPago = true;
        this.toast.error("Hubo un error procesando la compra", '', {
          positionClass: 'toast-top-left',
          progressBar: true
        });
        this.errorPago = true;
      }
    });
  }

}