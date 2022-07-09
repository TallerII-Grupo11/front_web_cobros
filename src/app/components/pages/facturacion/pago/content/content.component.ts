import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { param } from 'jquery';

declare let MercadoPago: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  public cantidadFiubaCoins: number;
  public token: string;
  public wallet: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private http: HttpClient
  ) { }
  
  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe((params: any) => {
      this.cantidadFiubaCoins = params.params.amount;
      this.token = params.params.token;
      this.wallet = params.params.wallet;
      localStorage.setItem('amount', params.params.amount);
    });
    this.cargarMercadoPago();
  }
  
  public cargarMercadoPago() {
    // Agrega credenciales de SDK
    const mp = new MercadoPago('TEST-12f2f977-23da-4cbd-b2fd-267d99fd35ca', {
      locale: 'es-AR'
    });

    const headers = { 
      'Authorization': 'Bearer TEST-2676310529179421-060420-9c3f3c0367474179ea37e30239e88d8f-214961961', 
      'Content-Type': 'application/json',
      'cache-control': 'no-cache'
    };

    const body = { 
      items: [
        {
          title: "Compra de FiubaCoins",
          description: "Spotifiuby",
          currency_id: "$",
          quantity: 1,
          unit_price: Number(this.cantidadFiubaCoins)
        }
      ],
      back_urls: {
        success: "https://fiubacoins-wallet.herokuapp.com/gracias?token=" + this.token + "&wallet=" + this.wallet + '&amount=' + this.cantidadFiubaCoins,
        failure: "https://fiubacoins-wallet.herokuapp.com/error",
        pending: "https://fiubacoins-wallet.herokuapp.com/"
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [
          { id: "ticket" }
        ]
      }
    };

    this.http.post<any>('https://api.mercadopago.com/checkout/preferences', body, { headers }).subscribe(data => {
        // Inicializa el checkout
        mp.checkout({
          preference: {
            id: data.id
          },
          render: {
            container: '.cho-container', // Indica dónde se mostrará el botón de pago
            label: 'Pagar con Mercado Pago', // Cambia el texto del botón de pago (opcional)
            type: 'wallet', // Aplica la marca de Mercado Pago al botón
          }
        });
    });
  }

}