import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Dialog } from 'primeng/dialog';
import { DatePicker } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    Dialog,
    DatePicker,
    ConfirmDialogModule,
    TableModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    Dialog,
    DatePicker,
    ConfirmDialogModule,
    TableModule
  ]
})
export class PrimeNGModule { }