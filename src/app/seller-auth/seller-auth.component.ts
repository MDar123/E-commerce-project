import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signup } from '../data-type'

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']  // Correcting to styleUrls
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) {}
  showlogin = false;
  loginError:string = '';

  ngOnInit(): void {
    this.seller.reload();  // Calling the reload method
  }

  signup(data:signup) {
    console.log(data);
    this.seller.sellerSignUp(data);
  }

  Login(data: login) {
    this.seller.sellerlogin(data);
    this.loginError = "";
    this.seller.loginError.subscribe((Error)=>{
      if(Error){
        this.loginError = "Invalid E-mail or Password";
      }
    })
  }

  openLogin(){
   this.showlogin=true;
}

openSignUp(){
  this.showlogin=false;
}

}
