import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product, ProductsService } from '@nx-commerce/products';
import { Router } from '@angular/router';
import { DialogService } from '@nx-commerce/ui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  products: Product[] = [];
  displayedColumns: String[] = [
    'image', 'name', 'price', 'countInStock', 'category', 'dateCreated', 'actions'
  ];
  endSub$: Subject<any> = new Subject();

  dataSource = new MatTableDataSource<Product>(this.products);
  
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
    this.productsService.getProducts()
    .pipe(takeUntil(this.endSub$))
    .subscribe((products) => {
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
    })
    .pipe(takeUntil(this.endSub$))
    .subscribe((sure) => {
      if (sure) {
        this.productsService.deleteProduct(productId)
        .pipe(takeUntil(this.endSub$))
        .subscribe(() => {
        this._getProducts();
        this._snackbar.open('Product deleted', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 4000,
          panelClass: 'success-snack'
        });
      }, () => {
          this._snackbar.open('Failed to delete product', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 4000,
            panelClass: 'failed-snack'
          });
      }); };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
