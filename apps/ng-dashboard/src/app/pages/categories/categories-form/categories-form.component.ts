import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@nx-commerce/products';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  editMode: boolean = false;
  currentCategoryId: string = '';
  pickColors: string[] = [
    'hsl(355, 78%, 56%)', 'hsl(323, 78%, 56%)', 'hsl(293, 78%, 56%)', 'hsl(268, 78%, 56%)',
    'hsl(246, 78%, 56%)', 'hsl(216, 78%, 56%)', 'hsl(182, 78%, 56%)', 'hsl(157, 78%, 56%)',
    'hsl(120, 78%, 56%)', 'hsl(69, 78%, 56%)', 'hsl(34, 78%, 56%)'
  ];
  // availableColors: ChipColor[] = [
  //   {name: 'none', color: undefined},
  //   {name: 'Primary', color: 'primary'},
  //   {name: 'Accent', color: 'accent'},
  //   {name: 'Warn', color: 'warn'}
  // ];
  pickIcons: string[] = [
    'home','build','work','pets','explore','book','create','school','emoji_events',
    'sports_esports','science','tune','smartphone','computer','watch','headset'
  ];
  endSub$: Subject<any> = new Subject();
  
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
  }

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    icon: ['code', Validators.required],
    color: ['black', Validators.required]
  });

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category)
    .pipe(takeUntil(this.endSub$))
    .subscribe((category: Category) => {
      this._snackBar.open(`Category ${category.name} created!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'success-snack'
      });
        this.location.back()
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
    this.categoriesService.updateCategory(category)
    .pipe(takeUntil(this.endSub$))
    .subscribe((category: Category) => {
      this._snackBar.open(`Category ${category.name} updated!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'success-snack'
      });
        this.location.back()
    },
    () => {
      this._snackBar.open('Failed to update category', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  get _categoryForm() {
    return this.categoryForm.controls;
  }

  private _checkEditMode() {
    this.activatedRoute.params
    .pipe(takeUntil(this.endSub$))
    .subscribe(params => {
      if(params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id)
        .pipe(takeUntil(this.endSub$))
        .subscribe(category => {
          this._categoryForm.name.setValue(category.name);
          this._categoryForm.icon.setValue(category.icon);
          this._categoryForm.color.setValue(category.color);
        })
      }
    });
  }

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
    this.location.back();
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
