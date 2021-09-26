import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@nx-commerce/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from '@nx-commerce/users';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@nx-commerce/users';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';

import { CategoriesService, ProductsService } from '@nx-commerce/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ConfirmDialogComponent } from './pages/categories/confirm-dialog/confirm-dialog.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

import { QuillModule } from 'ngx-quill';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        ProductsComponent,
        CategoriesComponent,
        UsersComponent,
        OrdersComponent,
        CategoriesFormComponent,
        ConfirmDialogComponent,
        ProductsFormComponent,
        UsersFormComponent,
        OrdersDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        UsersModule,
        QuillModule.forRoot()
    ],
    providers: [
        CategoriesService,
        ProductsService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
