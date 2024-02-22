import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperService = new JwtHelperService();
    constructor(){}
    //getter/setter
    getToken():string {
        return localStorage.getItem(this.TOKEN_KEY) ?? '';
    }
    setToken(token: string): void {        
        localStorage.setItem(this.TOKEN_KEY, token);             
    }
    getUserId(): number {
        let userObject = this.jwtHelperService.decodeToken(this.getToken() ?? '');
        // Check if userObject is null
        if (userObject === null) {
            return 0;
        }
        // Check if 'userId' property exists
        if ('userId' in userObject) {
            return parseInt(userObject['userId']);
        } else {
            return 0;
        }
    }
      
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }              
    isTokenExpired(): boolean { 
        if(this.getToken() == null) {
            return false;
        }       
        return this.jwtHelperService.isTokenExpired(this.getToken()!);
    }
}
