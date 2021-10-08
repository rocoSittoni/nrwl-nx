import { Component, Input, OnInit } from '@angular/core';
import { Category } from '@nx-commerce/products';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  
  @Input() categories: Category[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
