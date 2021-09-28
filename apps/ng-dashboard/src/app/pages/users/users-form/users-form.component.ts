import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@nx-commerce/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  editMode: boolean = false;
  currentUserId: string = '';
  endSub$: Subject<any> = new Subject();
  
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
  }

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    isAdmin: [false],
    street: [''],
    apartment: [''],
    zip: [''],
    city: [''],
    country: ['']
  });

  private _addUser(user: User) {
    this.usersService.createUser(user)
    .pipe(takeUntil(this.endSub$))
    .subscribe((user: User) => {
      this._snackBar.open(`User ${user.name} created!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'success-snack'
      });
        this.location.back()
    },
    () => {
      this._snackBar.open('Failed to create user', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user)
    .pipe(takeUntil(this.endSub$))
    .subscribe((user: User) => {
      this._snackBar.open(`User ${user.name} updated!`, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'success-snack'
      });
        this.location.back()
    },
    () => {
      this._snackBar.open('Failed to update user', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass: 'failed-snack'
      });
    });
  }

  get _userForm() {
    return this.userForm.controls;
  }

  private _checkEditMode() {
    this.activatedRoute.params
    .pipe(takeUntil(this.endSub$))
    .subscribe(params => {
      if(params.id) {
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id)
        .pipe(takeUntil(this.endSub$))
        .subscribe(user => {
          this._userForm.name.setValue(user.name);
          this._userForm.email.setValue(user.email);
          this._userForm.phone.setValue(user.phone);
          this._userForm.isAdmin.setValue(user.isAdmin);
          this._userForm.street.setValue(user.street);
          this._userForm.apartment.setValue(user.apartment);
          this._userForm.zip.setValue(user.zip);
          this._userForm.city.setValue(user.city);
          this._userForm.country.setValue(user.country);
          this._userForm.password.setValidators([]);
          this._userForm.password.updateValueAndValidity();
        })
      }
    });
  }

  onSubmit() {
    if(this.userForm.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      phone: this.userForm.value.phone,
      isAdmin: this.userForm.value.isAdmin,
      street: this.userForm.value.street,
      apartment: this.userForm.value.apartment,
      zip: this.userForm.value.zip,
      city: this.userForm.value.zip,
      country: this.userForm.value.country
    }
    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    } 
  }

  cancel() {
    this.location.back();
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
