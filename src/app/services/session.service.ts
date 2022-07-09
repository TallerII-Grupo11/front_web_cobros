import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    constructor() {
        console.log("Session Service created...");
     }

    private wallet: string;
    private montoAPagar: number;
    private token: string;

    public setUserWallet(wallet_addr: string) {
        this.wallet = wallet_addr;
    }

    public getWallet(): string {
        return this.wallet;
    }

    public setMontoAPagar(monto: number) {
        this.montoAPagar = monto;
    }

    public getMontoAPagar(): number {
        return this.montoAPagar;
    }

    public setToken(token: string) {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }
}