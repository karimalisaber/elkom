import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

type Role = 1 | 2

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogedIn(): boolean{
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) { return false; }

    if (!token) {
      return false ;
    }

    const isExpired = helper.isTokenExpired(token);

    return !isExpired;

  }

  setCurrentUserName(name: string){
    localStorage.setItem('userName', name);
  }


  getToken(){
    const token =  localStorage.getItem('token') ;
    // if(!user) return false;
    return token;
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }


  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }

  getRole(): Observable <Role>{
    return of(1)
  }
}
