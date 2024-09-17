import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected to 'styleUrls'
})
export class HomeComponent implements OnInit {

  popularProducts: product[] | undefined; // Updated type

  TreandyProduct: product[] | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.CrouselProducts().subscribe((data) => {
      console.log(data);
      this.popularProducts = data;
      this.TreandyProduct = data;
    });
  }
}

