import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@nx-commerce/products';
import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { timer } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
  });

  get name() {
    return this.categoryForm.get('name');
  }
  
  get icon() {
    return this.categoryForm.get('icon');
  }

  onSubmit() {
    if(this.categoryForm.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm.value.name,
      icon: this.categoryForm.value.icon
    }
    this.categoriesService.createCategory(category).subscribe(response => {
      this._snackBar.open('Category created!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
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
    console.log(this.categoryForm.value);
  }

  // openSnackBar() {
  //   this._snackBar.open('I am a fucking snackbar!!', 'Fuck you', {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }

}
