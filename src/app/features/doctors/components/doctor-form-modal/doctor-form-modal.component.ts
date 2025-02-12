import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/primeng.module';

@Component({
  selector: 'app-doctor-form-modal',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './doctor-form-modal.component.html',
  styleUrl: './doctor-form-modal.component.scss',
})
export class DoctorFormModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onDialogHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
