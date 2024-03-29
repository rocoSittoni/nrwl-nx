import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoriesService, Category } from '@nx-commerce/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@nx-commerce/ui';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  
  categories: Category[] = [];
  displayedColumns: String[] = ['id', 'name', 'icon', 'color', 'actions'];
  dataSource = new MatTableDataSource<Category>(this.categories);
  endSub$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService
  ) { }
  
  ngOnInit(): void {
    this._getCategories();
  }
  
  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSub$))
    .subscribe((categories) => {
      this.categories = categories;
    });
  }
    
  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  deleteCategory(categoryId: string) {
    this.dialogService.confirmDialog({
      title: "Sure you want to delete this item?",
      message: "This action can't be undone",
      confirmText: "Sure",
      cancelText: "No"
    })
    .pipe(takeUntil(this.endSub$))
    .subscribe((sure) => {
      if (sure) {
        this.categoriesService.deleteCategory(categoryId)
        .pipe(takeUntil(this.endSub$))
          .subscribe( () => {
        this._getCategories();
        this._snackBar.open('Category deleted', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 4000,
          panelClass: 'success-snack'
        });
      }, () => {
          this._snackBar.open('Failed to delete category', 'Close', {
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
