import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { AuthenticationService } from './services/authentication.service';
import { IApiResponse } from '../../interfaces/api-response.interface';
import { SweetalertService } from '../../services/sweetalert.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'core-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnDestroy {

  private fb = inject(FormBuilder);
  private service = inject(AuthenticationService);
  private sweetalert = inject(SweetalertService);
  private storage = inject(StorageService);
  private unsubscription = inject(SubscriptionsService);
  private router = inject(Router);
  private suscription !: Subscription;

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
        this.sweetalert.basicAlert(response.message, 'Welcome back ' + response.data?.userName, "success");
        this.storage.setSessionItem('token', response.data);
        this.router.navigate(['/']);
      }, error: (error: IApiResponse) => {
        if (error.code === 400) {
          const errorMessage = Object.values(error.data).join('. ');
          this.sweetalert.basicAlert(error.message, errorMessage, "error");
        } else {
          this.sweetalert.basicAlert('Wrong credentials', error.message, "error");
        }
      }
    });
  }
}