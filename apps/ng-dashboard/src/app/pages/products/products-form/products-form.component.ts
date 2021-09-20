import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoriesService, Category, Product, ProductsService } from '@nx-commerce/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  
  editMode: boolean = false;
  isSubmited: boolean = false;
  categories: Category[] = [];
  displayImage: string | ArrayBuffer = '';
  currentProductId: string = '';
  productForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      isFeatured: [false],
      image: [''],
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.productForm.invalid) {
      return;
    }
    const productFormData = new FormData();
    Object.keys(this._productForm).map((key) => {
      productFormData.append(key, this._productForm[key].value);
    });
    if(this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe((product: Product) => {
      this._snackBar.open(`Product created!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'success-snack'
      });
        this.location.back()
    },
    () => {
      this._snackBar.open('Failed to create product', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(() => {
      this._snackBar.open(`Product updated!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'success-snack'
      });
        this.location.back()
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

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({image: file});
      this.productForm.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.displayImage = fileReader.result
      } 
      fileReader.readAsDataURL(file);
    }
  }

  get _productForm() {
    return this.productForm.controls;
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if(params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe(product => {
          this._productForm.name.setValue(product.name);
          this._productForm.brand.setValue(product.brand);
          this._productForm.price.setValue(product.price);
          this._productForm.category.setValue(product.category.id);
          this._productForm.countInStock.setValue(product.countInStock);
          this._productForm.description.setValue(product.description);
          this._productForm.richDescription.setValue(product.richDescription);
          this._productForm.isFeatured.setValue(product.isFeatured);
          this.displayImage = product.image;
        });
      }
    });
  }

  public QuillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  }

}
