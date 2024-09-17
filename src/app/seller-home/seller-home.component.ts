import { Component , OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash , faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit{

  Productlist: undefined | product[];

  Productmessage:undefined | string;

  trash = faTrash;
  edit = faEdit;
   constructor(private product:ProductService){

   }


  ngOnInit(): void {
    this.List();
  }

  deleteProduct(id:number){

    console.log("Delete id" , id)

    this.product.deleteProduct(id).subscribe((result)=>{
    if(result){
      this.Productmessage = "Product is Deleted";
    }
    this.List();
    })
    setTimeout(() => {
      this.Productmessage = undefined;
    }, 3000);
  }

  List(){
    this.product.Productlist().subscribe((result)=>{
      console.log(result)
      this.Productlist=result;
    })
  }
}
