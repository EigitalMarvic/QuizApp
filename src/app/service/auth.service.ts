import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!:string|null;
  constructor(
    private router:Router,
  ) { }

  isAuthenticated():boolean
  {
    this.user = localStorage.getItem('User');
    return !!this.user;
  }

  signUp(email:string){
    localStorage.setItem('User',email);
  }

  logout(){
       localStorage.clear();
  }
}
