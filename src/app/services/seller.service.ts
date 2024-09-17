import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { signup, login } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIN = new BehaviorSubject<boolean>(false);
  loginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  sellerSignUp(data: signup ) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIN.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        console.log("Result", result);
      });
  }

  reload() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIN.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  sellerlogin(data: login) {
    console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' })
      .subscribe((result: any) => {
      console.log(result);
      if (result && result.body && result.body.length) {
        console.log("Seller logged in");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      } else {
        console.log("Seller is not logged in");
        this.loginError.emit(true);
      }
    });
  }
  
}