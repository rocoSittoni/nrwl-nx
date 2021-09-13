import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  deleteCategory: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  confirm() {
    this.deleteCategory = true;
  }

}
