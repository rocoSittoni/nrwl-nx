import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../../libs/ui/src/lib/material.module';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SwiperCarouselComponent } from './components/swiper/swiper-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { FeaturedComponent } from './components/featured/featured.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CarouselModule } from 'primeng-lts/carousel';
import { ProductPageComponent } from '@nx-commerce/products';
import { ProductsModule } from '@nx-commerce/products'
import { RatingModule } from 'primeng-lts/rating';
import { FormsModule } from '@angular/forms';
import {GalleriaModule} from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SwiperCarouselComponent,
    FeaturedComponent,
    ProductItemComponent,
    ChipsComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SwiperModule,
    HttpClientModule,
    CarouselModule,
    ProductsModule,
    RatingModule,
    FormsModule,
    GalleriaModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
