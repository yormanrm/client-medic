import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PrimeNGModule } from '../../../../shared/modules/primeng.module';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { DoctorsService } from '../../services/doctors.service';
import { ConfirmDialogService } from '../../../../shared/service/confirm-dialog.service';
import { IApiResponse } from '../../../../core/interfaces/api-response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeNGModule, CommonModule],
  templateUrl: './doctor-form-dialog.component.html',
  styleUrl: './doctor-form-dialog.component.scss',
})
export class DoctorFormDialogComponent implements OnDestroy {
  @Input() public visible: boolean = false;
  @Output() public visibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private service = inject(DoctorsService);
  private confirmDialogService = inject(ConfirmDialogService);
  private unsubscription = inject(SubscriptionsService);
  private suscription!: Subscription;

  public form: FormGroup = this.initializeForm();
  public maxDate: Date = new Date();

  ngOnDestroy(): void {
    this.unsubscription.unsubscription(this.suscription);
  }

  initializeForm(): FormGroup {
    return this.fb.group({
      fullName: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-Z\\s]+$'),
        ],
      }),
      birthday: new FormControl<string>('', {
        validators: [
          Validators.required
        ],
      }),
      specialty: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z\\s]+$'),
        ],
      }),
      professionalLicense: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^\\d{8}$'),
        ],
      }),
      telephone: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.pattern('^\\+52\\d{10}$'),
        ],
      }),
      email: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.email,
        ],
      }),
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;
    switch (controlName) {
      case 'fullName':
        if (errors['required']) {
          return 'Full name is required.';
        } else if (errors['minlength']) {
          return 'Full name must be at least 2 characters long.';
        } else if (errors['maxlength']) {
          return 'Full name must be at most 100 characters long.';
        } else if (errors['pattern']) {
          return 'Full name can only contain letters and spaces.';
        }
        break;
      case 'birthday':
        if (errors['required']) {
          return 'Date of birth is required.';
        } else if (errors['pastDate']) {
          return 'Date of birth must be in the past.';
        }
        break;
      case 'specialty':
        if (errors['required']) {
          return 'Specialty is required.';
        } else if (errors['minlength']) {
          return 'Specialty must be at least 2 characters long.';
        } else if (errors['maxlength']) {
          return 'Specialty must be at most 50 characters long.';
        } else if (errors['pattern']) {
          return 'Specialty can only contain letters and spaces.';
        }
        break;
      case 'professionalLicense':
        if (errors['required']) {
          return 'Professional license is required.';
        } else if (errors['minlength'] || errors['maxlength']) {
          return 'Professional license must be exactly 8 characters long.';
        } else if (errors['pattern']) {
          return 'Professional license must contain exactly 8 digits.';
        }
        break;
      case 'telephone':
        if (errors['required']) {
          return 'Telephone number is required.';
        } else if (errors['pattern']) {
          return 'Telephone number must follow the format +52XXXXXXXXXX.';
        }
        break;
      case 'email':
        if (errors['required']) {
          return 'Email is required.';
        } else if (errors['email']) {
          return 'Email must be a valid email address.';
        }
        break;
      default:
        return '';
    }
    return '';
  }

  onSubmitForm(): void {
    this.suscription = this.service.register(this.form.value).subscribe({
      next: (response: IApiResponse) => {
        this.confirmDialogService.showConfirmDialog(
          response.message,
          'Welcome ' + response.data?.fullName,
          () => {
            this.onDialogHide();
          },
          () => {},
          false // No mostrar el botón de cancelar
        );
      },
      error: (error: IApiResponse) => {
        this.confirmDialogService.showConfirmDialog(
          'Error',
          error.message,
          () => {},
          () => {},
          false // No mostrar el botón de cancelar
        );
      },
    });
  }

  onDialogHide(): void {
    this.form = this.initializeForm();
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
