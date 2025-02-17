import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { AuthenticationService } from './services/authentication.service';
import { IApiResponse } from '../../interfaces/api-response.interface';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { PrimeNGModule } from '../../../shared/modules/primeng.module';
import { ConfirmDialogService } from '../../../shared/service/confirm-dialog.service';

@Component({
  selector: 'core-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimeNGModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnDestroy {

  private fb = inject(FormBuilder);
  private service = inject(AuthenticationService);
  private storage = inject(StorageService);
  private unsubscription = inject(SubscriptionsService);
  private router = inject(Router);
  private confirmDialogService = inject(ConfirmDialogService);
  private suscription!: Subscription;

  public form: FormGroup = this.fb.group({
    username: new FormControl<string>('', {
      validators: [
        Validators.required,
      ]
    }),
    password: new FormControl<string>('', {
      validators: [
        Validators.required
      ]
    })
  });

  ngOnDestroy(): void {
    this.unsubscription.unsubscription(this.suscription);
  }

  logIn(): void {
    this.suscription = this.service.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe({
      next: (response: IApiResponse) => {
        this.confirmDialogService.showConfirmDialog(
          response.message,
          'Welcome back ' + response.data?.userName,
          () => {
            this.storage.setSessionItem('token', response.data);
            this.router.navigate(['/']);
          },
          () => {},
          false // No mostrar el botón de cancelar
        );
      }, error: (error: IApiResponse) => {
        if (error.code === 400) {
          const errorMessage = Object.values(error.data).join('. ');
          this.confirmDialogService.showConfirmDialog(
            error.message,
            errorMessage,
            () => {},
            () => {},
            false // No mostrar el botón de cancelar
          );
        } else {
          this.confirmDialogService.showConfirmDialog(
            'Wrong credentials',
            error.message,
            () => {},
            () => {},
            false // No mostrar el botón de cancelar
          );
        }
      }
    });
  }
}