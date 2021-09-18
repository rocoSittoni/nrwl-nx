import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@nx-commerce/products';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@nx-commerce/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  categories: Category[] = [];
  displayedColumns: String[] = ['id', 'name', 'icon', 'color', 'actions'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

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
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
    
  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }  

  deleteCategory(categoryId: string) {
    // Display confirmation dialog
    this.dialogService.confirmDialog({
      title: "Sure you want to delete this item?",
      message: "This action can't be undone",
      confirmText: "Sure",
      cancelText: "No"
    }).subscribe((sure) => {
      // If true delete category and display success snack
      if (sure) {
        this.categoriesService.deleteCategory(categoryId).subscribe( () => {
        this._getCategories();
        this._snackBar.open('Category deleted', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: 'success-snack'
        });
      }, () => {
          this._snackBar.open('Failed to delete category', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'failed-snack'
          });
      }); };
    });
  }

}
