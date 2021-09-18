import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoriesService, Category } from '@nx-commerce/products';

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
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  onSubmit() {

  }

  onCancel() {
    this.location.back();
  }

  productForm = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: ['', Validators.required, Validators.pattern('/^\d+$/')],
    category: ['', Validators.required],
    countInStock: ['', Validators.required, Validators.pattern('/^\d+$/')],
    description: ['', Validators.required],
    richDescription: [''],
    isFeatured: [''],
    image: [''],
  });

  get _productForm() {
    return this.productForm.controls;
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.displayImage = fileReader.result
      } 
      fileReader.readAsDataURL(file);
    }
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
