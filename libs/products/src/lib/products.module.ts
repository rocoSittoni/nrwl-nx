import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './pages/product-page/product-page.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      ProductPageComponent
    ],
    exports: [
      ProductPageComponent
    ]
})
export class ProductsModule {}