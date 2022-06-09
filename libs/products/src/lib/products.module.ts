import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng-lts/rating';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule,
      RatingModule,
      FormsModule
    ],
    declarations: [
      ProductPageComponent,
    ],
    exports: [
    ]
})
export class ProductsModule {}