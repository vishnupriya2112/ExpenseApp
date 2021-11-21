import {Injectable} from '@angular/core';
import {HttpRequest,HttpHandler,HttpInterceptor} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth:AuthService,private router:Router){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        
        if(req.headers.get('noauth')){
            return next.handle(req.clone());
        }
        else{
            const cloned=req.clone({
                headers:req.headers.set("Authorization",'Bearer ' +this.auth.getToken())
            });
            return next.handle(cloned).pipe(
                tap(
                    event=>{},
                    err=>{
                        if(err.error.auth==false){
                            this.router.navigateByUrl('/login');
                        }
                    })
            )
        }
    }
    
}