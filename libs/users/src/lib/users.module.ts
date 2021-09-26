import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { MaterialModule } from '@nx-commerce/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule,
      AuthRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule
    ],
    declarations: [
      LoginComponent
    ]
})
export class UsersModule {}