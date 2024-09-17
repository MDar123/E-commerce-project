import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Corrected to styleUrls (plural)
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';
  search: undefined | product[];
  sellerName: string = '';  // Changed to string for consistency
  userName: string = '';
  CartItems = 0;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          this.productService.getCartList(userData.id);
        }
         else {
          this.menuType = 'default';
        }
      }
    });
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.CartItems= JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((items)=>{
      this.CartItems= items.length
    })
  }

  logout() {
    if (confirm("Are you sure you want to Logout?")) {
      localStorage.removeItem('seller');
      this.router.navigate(['/']);
    }
  }

  userlogout(){ 
    localStorage.removeItem('user');
  this.router.navigate(['user-auth']);
  this.productService.cartData.emit([]);
}

  serachProduct(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    if (element.value) {
      this.productService.SearchProduct(element.value).subscribe((result) => {
        console.log(result);
        this.search = result.length > 5 ? result.slice(0, 5) : result;
      });
    } else {
      this.search = undefined;
    }
  }

  hidesearch() {
    this.search = undefined;
  }

  Submitsearch(term: string) {
    this.router.navigate(['/search', term]);
  }
}

