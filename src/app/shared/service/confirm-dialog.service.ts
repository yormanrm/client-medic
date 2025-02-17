import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IConfirmDialogState } from '../interfaces/confirm-dialog-state.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private confirmDialogStateSubject = new Subject<IConfirmDialogState>();
  confirmDialogState$ = this.confirmDialogStateSubject.asObservable();

  showConfirmDialog(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void = () => {},
    showCancelButton: boolean = true
  ) {
    this.confirmDialogStateSubject.next({
      title,
      message,
      showCancelButton,
      onConfirm,
      onCancel,
    });
  }
}
