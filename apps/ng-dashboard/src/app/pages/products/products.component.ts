import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@nx-commerce/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {
  
  products: Product[] = [];
  displayedColumns: String[] = [
    'image', 'name', 'price', 'countInStock', 'category', 'dateCreated', 'actions'
  ];
  
  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
