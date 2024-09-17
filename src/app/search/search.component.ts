import { Component , OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  searchresult : undefined | product[];
  constructor(private activatedRoute:ActivatedRoute, 
    private product:ProductService){}


    ngOnInit(): void {
      let searchTerm = this.activatedRoute.snapshot.paramMap.get('term');
      console.log(searchTerm);
      searchTerm && this.product.SearchProduct(searchTerm).subscribe((result) => {
        this.searchresult = result;
      });
    }

}
