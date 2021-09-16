import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl ,Validators } from '@angular/forms';
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
  pickColors: string[] = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'turquoise', 'violet', 'pink', 'brown', 'grey'
  ];
  pickIcons: string[] = [
    'code','cloud','business','grade','lunch_dining','sports_esports','build','work','emoji_events','home','pets','directions_car','explore','school'
  ];
  
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._checkEditMode()
  }

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    icon: ['work', Validators.required],
    color: ['black', Validators.required]
  });


  onSubmit() {
    if(this.categoryForm.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.value.name,
      icon: this.categoryForm.value.icon,
      color: this.categoryForm.value.color,
    }
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    } 
  }

  cancel() {
    timer().toPromise().then(() => {
      this.location.back();
    });
  }

  get name() {
    return this.categoryForm.get('name');
  }
  
  get icon() {
    return this.categoryForm.get('icon');
  }

  get color() {
    return this.categoryForm.get('color');
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe((category: Category) => {
      this._snackBar.open(`Category ${category.name} created!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'success-snack'
      });
      timer(1000).toPromise().then(() => {
        this.location.back()
      });
    },
    () => {
      this._snackBar.open('Failed to create category', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe((category: Category) => {
      this._snackBar.open(`Category ${category.name} updated!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'success-snack'
      });
      timer(1000).toPromise().then(() => {
        this.location.back()
      });
    },
    () => {
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
          this.categoryForm.value.color.setValue(category.color);
        })
      }
    });
  }

}
