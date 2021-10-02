import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value]);
  }

}
