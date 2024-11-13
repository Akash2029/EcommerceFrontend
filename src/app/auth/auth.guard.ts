import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(UserService);
  const authService = inject(UserAuthService);
  if(authService.getToken() !== null){
   const role = route.data['roles'] as Array<string>;
   if(role){
    console.log("checking role",role);
     const match =  userService.roleMatch(role);
     console.log("match",match);
     if(match){
      return true;
     }else{
      router.navigate(['/forbidden']);
      return false;
     }
   }
  }
  router.navigate(['/login']);
  return false;
};
