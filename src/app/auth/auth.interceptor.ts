import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private userAuth:UserAuthService,
        private router:Router
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.headers.get('No-Auth'));
      if(req.headers.get('No-Auth') === 'True'){
        return next.handle(req.clone());
      }

      const token = this.userAuth.getToken();
      const authRequest = req.clone({
        headers:req.headers.set('Authorization',`Bearer ${token}`)
      });
      req = authRequest;
      console.log("inside interceptor token",token);
    //   this.addToken(req,token);
      console.log("inside interceptor headers",req.headers.get('Authorization'));
      return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401){
                    this.router.navigate(['/login']);
                }else if(err.status === 403){
                    this.router.navigate(['/forbidden']);
                }
                return throwError(() =>{"some thing is wrong"});
            }
        )
      );
    }

    // addToken(request:HttpRequest<any>,token:string | null){
    //     console.log("add token is called");
    //     return request.clone(
    //         {
    //             setHeaders:{
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     );
    // }
    
}