import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
import {signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword} from 'firebase/auth';
import 'firebase/auth';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ENV } from 'environments'

@Injectable()
export class UserService {
    private readonly baseUsersUrl = 'https://spotifiuby-apigateway.herokuapp.com/spotifiuby-back-users';
    private readonly baseProfilesUrl = 'https://spotifiuby-apigateway.herokuapp.com/spotifiuby-profiles';
    private readonly baseSmartContractsUrl = 'https://spotifiuby-apigateway.herokuapp.com/spotifiuby-smart-contract';

    constructor(
        private http: HttpClient,
        private router: Router,
        private toast: ToastrService,
        private sessionService: SessionService,
    ) { }

    // App Firebase configuration
    private firebaseConfig = {
        apiKey: ENV.firebaseConfig.apiKey,
        authDomain: ENV.firebaseConfig.authDomain,
        projectId: ENV.firebaseConfig.projectId,
        storageBucket: ENV.firebaseConfig.storageBucket,
        messagingSenderId: ENV.firebaseConfig.messagingSenderId,
        appId: ENV.firebaseConfig.appId,
        measurementId: ENV.firebaseConfig.measurementId
    };

    private FirebaseErrorCodes = {
        AUTH_EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
        AUTH_INVALID_EMAIL: "auth/invalid-email",
        AUTH_INVALID_PASSWORD: "auth/wrong-password",
        AUTH_USER_DISABLED: "auth/user-disabled",
        AUTH_USER_NOT_FOUND: "auth/user-not-found",
        AUTH_TOO_MANY_REQUESTS: "auth/too-many-requests",
        AUTH_WEAK_PASSWORD: "auth/weak-password",
    };

    // Initialize Firebase
    private firebaseApp = initializeApp(this.firebaseConfig);
    private auth = getAuth(this.firebaseApp);


    public sendFirebaseResetPasswordEmail(email) {
        return sendPasswordResetEmail(this.auth, email)
    }

    public async getCurrentToken() {
        const user = this.auth.currentUser;
        if (user)
            return await user.getIdToken(true)
        return undefined;
    }

    public getFirebaseUserId(user) {
        return (user) ? user.uid : undefined;
    }

    public async signInWithUsernameAndPassword(email, password) {
        let loginResponse;
        try {
            await signInWithEmailAndPassword(this.auth, email, password).then(async res => {
                let firebase_id = this.getFirebaseUserId(this.auth.currentUser);
                let token = await this.getCurrentToken();
                this.sessionService.setToken(token);
                localStorage.setItem('token', token);
                this.getUserData(firebase_id, token).subscribe((res: any) => {
                    this.getProfileData(res[0].id, token).subscribe((res: any) => {
                        this.sessionService.setUserWallet(res[0].wallet_addr);
                        localStorage.setItem('wallet', res[0].wallet_addr);
                        this.toast.success("Benvenido!", '', {
                        positionClass: 'toast-top-left',
                        progressBar: true
                        });
                        this.router.navigate(['fiubacoins/compra']);
                    });
                });
                
            });
        } catch (error) {
            let errorMessage = ""
            if (error.code === this.FirebaseErrorCodes.AUTH_USER_DISABLED) {
                errorMessage = 'Tu usuario se encuentra bloqueado, no podrás iniciar sesión'
            } else if (error.code === this.FirebaseErrorCodes.AUTH_INVALID_EMAIL
                || error.code === this.FirebaseErrorCodes.AUTH_USER_NOT_FOUND) {
                errorMessage = 'Email invalido'
            } else if (error.code === this.FirebaseErrorCodes.AUTH_INVALID_PASSWORD) {
                errorMessage = 'Contraseña incorrecta'
            } else if (error.code === this.FirebaseErrorCodes.AUTH_TOO_MANY_REQUESTS) {
                errorMessage = 'El usuario fue bloqueado temporalmente por realizar múltiples requests, resetea tu contraseña o volvé a intentar más tarde'
            } else {
                errorMessage = 'Error iniciando sesión, intenta de nuevo';
            }
            this.toast.error(errorMessage, '', {
            positionClass: 'toast-top-left',
            progressBar: true
            });
        }
    }

    public getUserData(firebase_id, token) {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', token);
        return this.http.get(this.baseUsersUrl + '/users?firebase_id=' + firebase_id,{
            headers: headers
        });
    }

    public getProfileData(user_id, token) {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', token);
        return this.http.get(this.baseProfilesUrl + '/listeners?user_id=' + user_id,{
            headers: headers
        });
    }

    public transferFiubaCoins(){
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', localStorage.getItem('token'));
        let body = {
            "sender": ENV.admin_wallet_address,
            "recipient": localStorage.getItem('wallet'),
            "amount": localStorage.getItem('amount')
        }
        return this.http.post(this.baseSmartContractsUrl + '/transfer', body, {
            headers: headers
        });
    }

}
