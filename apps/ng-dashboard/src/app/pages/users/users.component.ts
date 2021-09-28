import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@nx-commerce/users';
import { User } from '@nx-commerce/users';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@nx-commerce/ui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  displayedColumns: String[] = ['name', 'email', 'isAdmin', 'country', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);
  endSub$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this.usersService.getUsers()
    .pipe(takeUntil(this.endSub$))
    .subscribe((users) => {
      this.users = users;
    });
  }
    
  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  deleteUser(userId: string) {
    this.dialogService.confirmDialog({
      title: "Sure you want to delete this item?",
      message: "This action can't be undone",
      confirmText: "Sure",
      cancelText: "No"
    }).pipe(takeUntil(this.endSub$))
    .subscribe((sure) => {
      if (sure) {
        this.usersService.deleteUser(userId)
        .pipe(takeUntil(this.endSub$))
        .subscribe( () => {
        this._getUsers();
        this._snackBar.open('User deleted', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 4000,
          panelClass: 'success-snack'
        });
      }, () => {
          this._snackBar.open('Failed to delete user', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 4000,
            panelClass: 'failed-snack'
          });
      }); };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.endSub$.complete();
  }

}
