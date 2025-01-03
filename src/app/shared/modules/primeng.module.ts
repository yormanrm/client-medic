import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';


@NgModule({
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule
  ]
})
export class PrimeNGModule { }