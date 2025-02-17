import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogService } from './shared/service/confirm-dialog.service';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfirmDialogComponent],
  template: `
    <router-outlet></router-outlet>
    <shared-confirm-dialog
      [title]="confirmDialogTitle"
      [message]="confirmDialogMessage"
      [visible]="confirmDialogVisible"
      [showCancelButton]="confirmDialogShowCancelButton"
      (confirm)="onConfirm()"
      (cancel)="onCancel()"
    >
    </shared-confirm-dialog>
  `,
})

export class AppComponent {
  confirmDialogVisible = false;
  confirmDialogTitle = '';
  confirmDialogMessage = '';
  confirmDialogShowCancelButton = true;
  confirmDialogOnConfirm: () => void = () => {};
  confirmDialogOnCancel: () => void = () => {};

  constructor(private confirmDialogService: ConfirmDialogService) {
    this.confirmDialogService.confirmDialogState$.subscribe((dialog) => {
      this.confirmDialogTitle = dialog.title;
      this.confirmDialogMessage = dialog.message;
      this.confirmDialogShowCancelButton = dialog.showCancelButton;
      this.confirmDialogOnConfirm = dialog.onConfirm;
      this.confirmDialogOnCancel = dialog.onCancel;
      this.confirmDialogVisible = true;
    });
  }

  onConfirm() {
    this.confirmDialogOnConfirm();
    this.confirmDialogVisible = false; // Ocultar el diálogo después de confirmar
  }

  onCancel() {
    this.confirmDialogOnCancel();
    this.confirmDialogVisible = false; // Ocultar el diálogo después de cancelar
  }
}
