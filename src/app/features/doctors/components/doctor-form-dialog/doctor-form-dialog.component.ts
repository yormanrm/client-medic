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
  @Output() public visibleChange: EventEmitter<any> =
    new EventEmitter<any>();

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
        validators: [Validators.required],
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
        validators: [Validators.required, Validators.pattern('^\\+52\\d{10}$')],
      }),
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
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
    this.suscription = this.service.register(this.form).subscribe({
      next: (response: IApiResponse) => {
        const message = this.buildMessage(
          response.data?.fullName,
          response.data?.username,
          response.data?.password
        );
        this.generateTxtFile(
          message,
          `${response.data?.fullName}_credentials.txt`
        );
        this.confirmDialogService.showConfirmDialog(
          response.message,
          'Credentials generated successfully. Please bring the credentials to the authorized personnel for use and indicate that the password must be changed once you log in for the first time.',
          () => {
            this.onDialogHide(true);
          },
          () => {},
          false
        );
      },
      error: (error: IApiResponse) => {
        this.confirmDialogService.showConfirmDialog(
          'Error',
          error.message,
          () => {},
          () => {},
          false
        );
      },
    });
  }

  buildMessage(fullName: string, username: string, password: string): string {
    return `The access credentials for Dr. ${fullName} are as follows:\nUsername: ${username}\nPassword: ${password}\nThe password must be changed once you log in for the first time.`;
  }

  generateTxtFile(content: string, fileName: string): void {
    // Crea un nuevo Blob con el contenido proporcionado y especifica el tipo MIME como 'text/plain'
    const blob = new Blob([content], { type: 'text/plain' });
    // Crea una URL de objeto para el Blob, que se puede usar como una URL de descarga
    const url = window.URL.createObjectURL(blob);
    // Crea un nuevo elemento <a> (enlace)
    const a = document.createElement('a');
    // Establece el atributo href del enlace a la URL del objeto
    a.href = url;
    // Establece el atributo download del enlace al nombre de archivo proporcionado
    a.download = fileName;
    // Añade el enlace al cuerpo del documento
    document.body.appendChild(a);
    // Simula un clic en el enlace para iniciar la descarga del archivo
    a.click();
    // Elimina el enlace del cuerpo del documento
    document.body.removeChild(a);
    // Revoca la URL del objeto para liberar memoria
    window.URL.revokeObjectURL(url);
  }

  onDialogHide(existChange: boolean): void {
    this.form = this.initializeForm();
    this.visible = false;
    this.visibleChange.emit({ visible: this.visible, existChange: existChange });
  }
}