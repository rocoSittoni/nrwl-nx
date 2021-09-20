import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@nx-commerce/products';
import { Router } from '@angular/router';
import { DialogService } from '@nx-commerce/ui';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private productsService: ProductsService,
    private router: Router,
    private dialogService: DialogService,
    private _snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.dialogService.confirmDialog({
      title: "Sure you want to delete this item?",
      message: "This action can't be undone",
      confirmText: "Sure",
      cancelText: "No"
    }).subscribe((sure) => {
      if (sure) {
        this.productsService.deleteProduct(productId).subscribe(() => {
        this._getProducts();
        this._snackbar.open('Product deleted', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: 'success-snack'
        });
      }, () => {
          this._snackbar.open('Failed to delete product', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'failed-snack'
          });
      }); };
    });
  }

}
