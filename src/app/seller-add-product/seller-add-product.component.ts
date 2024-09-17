import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  addProductMessage: string | undefined;

  constructor(private product: ProductService) {}

  AddProduct(data: product, form: NgForm) {
    this.product.addproduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = "Product is added successfully";
        form.resetForm();  // This will clear the input fields after successful submission
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }
}

