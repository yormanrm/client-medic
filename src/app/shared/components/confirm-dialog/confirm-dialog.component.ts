import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrimeNGModule } from '../../modules/primeng.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-confirm-dialog',
  standalone: true,
  imports: [PrimeNGModule, CommonModule],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [closable]="false"
      [header]="title"
      [draggable]="false"
      [resizable]="false"
      [breakpoints]="{
        '768px': '70vw',
        '576px': '90vw'
      }"
    >
      <p>{{ message }}</p>
      <p-button
        [styleClass]="showCancelButton ? '' : 'w-100'"
        (click)="onConfirm()"
        [raised]="true"
        label="Confirm"
      />
      @if (showCancelButton) {
      <p-button (click)="onCancel()" [outlined]="true" label="Cancel" />
      }
    </p-dialog>
  `,
  styles: [
    `
      ::ng-deep .p-overlay-mask {
        backdrop-filter: blur(5px);
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() visible: boolean = false;
  @Input() showCancelButton: boolean = true;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.visible = false;
    this.confirm.emit();
  }

  onCancel() {
    this.visible = false;
    this.cancel.emit();
  }
}
