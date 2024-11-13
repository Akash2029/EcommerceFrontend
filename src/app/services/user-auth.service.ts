import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor() { }

  setRoles(roles:[]){
    localStorage.setItem("roles",JSON.stringify(roles));
  }

  getRoles(){
      return JSON.parse(localStorage.getItem("roles") || '{}');
  }

  setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  getToken(){
    return localStorage.getItem("jwtToken");
  }

  clear(){
    localStorage.clear();
  }

  isLoggedIn(){
    if(this.getToken()!= null){
      return true;
    }else{
      return false;
    }
  }

  isAdmin(){
    const roles:any[] = this.getRoles();
    if(roles[0].roleName === "admin"){
      return true;
    }else{
      return false;
    }
  }

}
