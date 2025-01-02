import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DoctorsService } from './services/doctors.service';
import { IDoctor } from './interfaces/doctor.interface';
import { DatePipe } from '@angular/common';
import { DoctorFormModalComponent } from './components/doctor-form-modal/doctor-form-modal.component';
import { IApiResponse } from '../../core/interfaces/api-response.interface';
import { Subscription } from 'rxjs';
import { SubscriptionsService } from '../../core/services/subscriptions.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [DatePipe, DoctorFormModalComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export class DoctorsComponent implements OnInit, OnDestroy {
  private service = inject(DoctorsService);
  private subscriptionService = inject(SubscriptionsService);
  private subscription: Subscription = new Subscription();
  public doctors: IDoctor[] =[];

  ngOnInit(): void {
    this.getDoctors();
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscription(this.subscription);
  }

  getDoctors(): void {
    this.subscription = this.service.getAll().subscribe({
      next: (response: IApiResponse) => {
        this.doctors = response.data;
      },
      error: (error: IApiResponse) => {
        console.error(error);
      }
    });
  }

}
