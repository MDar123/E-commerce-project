import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-updata-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit{
   
  UpdateMessage : undefined | string;
  productData : undefined | product;

  constructor(private route:ActivatedRoute ,
    private product:ProductService ,
    private router:Router){

  }

  UpdateProduct(data:product){
  console.log(data);
  if(this.productData){
    data.id= this.productData.id;
  }
  this.product.updateProduct(data).subscribe((data)=>{
   if(data){
    this.UpdateMessage = "Product has Updated";
   }
  });
  setTimeout(()=>{
    this.UpdateMessage = undefined;
    this.router.navigate(['seller-home']);
  },3000);
}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&   this.product.getProduct(productId).subscribe((result)=>{
     console.log(result);
     this.productData = result;
    })
  }

}
