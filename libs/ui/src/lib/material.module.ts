import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


const MaterialComponents = [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
];

@NgModule({
    imports: [ MaterialComponents, CommonModule ],
  exports: [ MaterialComponents ]
})
export class MaterialModule {}