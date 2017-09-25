import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    loggedInToken(){
        const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
        const jwt = new JwtHelper();
        const decode_jwt = jwt.decodeToken(token);
        //console.log(decode_jwt.user.lastName);
        return decode_jwt.user.firstName == "Administrator" && decode_jwt.user.lastName == "User" && decode_jwt.user.email == "administrator@gmail.com" ;
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}