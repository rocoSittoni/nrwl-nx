import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@nx-commerce/products';
import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  editMode: boolean = false;
  currentCategoryId: string = '';
  title: string = '';
  text: string = '';
  
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._checkEditMode()
  }

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
  });

  onSubmit() {
    if(this.categoryForm.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.value.name,
      icon: this.categoryForm.value.icon
    }
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    } 
  }

  get name() {
    return this.categoryForm.get('name');
  }
  
  get icon() {
    return this.categoryForm.get('icon');
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(response => {
      this._snackBar.open('Category created!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'success-snack'
      });
      timer(2000).toPromise().then(done => {
        this.location.back()
      });
    },
    (error)=> {
      this._snackBar.open('Failed to create category', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(response => {
      this._snackBar.open('Category updated!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'success-snack'
      });
      timer(2000).toPromise().then(done => {
        this.location.back()
      });
    },
    (error)=> {
      this._snackBar.open('Failed to update category', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'failed-snack'
      });
    });
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if(params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category => {
          this.categoryForm.value.name.setValue(category.name);
          this.categoryForm.value.icon.setValue(category.icon);
        })
      }
    });
  }

}
