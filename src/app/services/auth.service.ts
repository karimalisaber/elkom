import { User } from './../store/session/session.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogedin(): boolean{
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) { return false; }

    if (!token) {
      return false ;
    }

    const isExpired = helper.isTokenExpired(token);

    return !isExpired;

  }

  getToken(){
    const token =  localStorage.getItem('token') ;
    // if(!user) return false;
    return token;
  }


  setToken(token: string){
    localStorage.setItem('token', token);
  }

  setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null{
    const user =  localStorage.getItem('user') ;
    if(!user) return null;
    return JSON.parse(user);
  }

  setRefreshToken(token: string){
    localStorage.setItem('refreshToken', token);
  }
  getRefreshToken(){
    const token =  localStorage.getItem('refreshToken') ;
    // if(!user) return false;
    return token;
  }


  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
  }
}
