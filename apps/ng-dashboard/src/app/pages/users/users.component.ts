import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@nx-commerce/users';
import { User } from '@nx-commerce/users';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@nx-commerce/ui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  displayedColumns: String[] = ['name', 'email', 'isAdmin', 'country', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);

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
    this.usersService.getUsers().subscribe((users) => {
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
    }).subscribe((sure) => {
      if (sure) {
        this.usersService.deleteUser(userId).subscribe( () => {
        this._getUsers();
        this._snackBar.open('User deleted', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: 'success-snack'
        });
      }, () => {
          this._snackBar.open('Failed to delete user', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
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

}
