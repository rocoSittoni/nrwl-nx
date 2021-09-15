import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { confirmDialogData } from '@nx-commerce/ui';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../../apps/ng-dashboard/src/app/pages/categories/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: confirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data,
      disableClose: true
    }).afterClosed();
  }

}
