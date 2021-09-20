import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoriesService, Category, Product, ProductsService } from '@nx-commerce/products';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  productForm = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: ['', Validators.required, Validators.pattern('/^\d+$/')],
    category: ['', Validators.required],
    countInStock: ['', Validators.required, Validators.pattern('/^\d+$/')],
    description: ['', Validators.required],
    richDescription: [''],
    isFeatured: [false],
    image: [''],
  });

  onSubmit() {
    this.isSubmited = true;
    if (this.productForm.invalid) {
      return;
    }
    const productFormData = new FormData();
    Object.keys(this._productForm).map((key) => {
      productFormData.append(key, this._productForm[key].value);
    });
    this._addProduct(productFormData);
  }

  onCancel() {
    this.location.back();
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe((product: Product) => {
      this._snackBar.open(`Product ${product.name} created!`, 'Close', {
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

}
