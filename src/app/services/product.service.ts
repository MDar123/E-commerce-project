import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>(); 

  constructor( private http:HttpClient ,
    private router:Router) { 

  }
  
  addproduct(data:product){
   return this.http.post('http://localhost:3000/Products',data)
  }

  Productlist(){
    return this.http.get<product[]>('http://localhost:3000/Products');
  }

  deleteProduct(id:number){
   return this.http.delete(`http://localhost:3000/Products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/Products/${id}`);
  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/Products/${product.id}` , product);
  }

  CrouselProducts(){
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=8');
  }

  // TreandyProduct(){
  //   return this.http.get<product[]>('http://localhost:3000/Products?_limit=8');
  // }

  SearchProduct(searchTerm: string) {
    return this.http.get<product[]>(`http://localhost:3000/Products?Category=${searchTerm}`);
  }
  
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (localCart) {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit([data]);
    } else {
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
    this.cartData.emit(cartData);
  }

  removeItemToCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:product[] = JSON.parse(cartData);
      items = items.filter((items:product)=>productId!==items.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  AddToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
  }

  getCartList(userId: number) {
    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)

  }

}
