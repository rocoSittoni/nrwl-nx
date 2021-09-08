import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  id: number;
  icon: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', icon: 'H'},
  {id: 2, name: 'Helium', icon: 'He'},
  {id: 3, name: 'Lithium', icon: 'Li'},
  {id: 4, name: 'Beryllium', icon: 'Be'},
  {id: 5, name: 'Boron', icon: 'B'},
  {id: 6, name: 'Carbon', icon: 'C'},
  {id: 7, name: 'Nitrogen', icon: 'N'},
  {id: 8, name: 'Oxygen', icon: 'O'},
  {id: 9, name: 'Fluorine', icon: 'F'},
  {id: 10, name: 'Neon', icon: 'Ne'},
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'name', 'icon'];
  dataSource = ELEMENT_DATA;

}
