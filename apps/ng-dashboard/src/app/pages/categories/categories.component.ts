import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@nx-commerce/products';
// import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from '@nx-commerce/ui';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  categories: Category[] = [];
  displayedColumns: String[] = ['id', 'name', 'icon', 'actions'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    // private location: Location,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) { console.log(this.categories) }
  
  ngOnInit(): void {
    this._getCategories();
  }
  
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((catgs) => {
      this.categories = catgs;
    });
  }
    // editCategory(categoryId: string) {
    //   this.categoriesService.editCategory(categoryId).subscribe()
    // }  

  deleteCategory(categoryId: string) {
    this.categoriesService.deleteCategory(categoryId).subscribe((response) => {

      this._getCategories();
      this._snackBar.open('Category deleted', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'success-snack'
      });
    },
    (error)=> {
      this._snackBar.open('Failed to delete category', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  openDialog() {
    this.dialogService.confirmDialog()
  }

}
