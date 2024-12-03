import { Component, inject } from '@angular/core';
import { StorageService } from '../../../../services/storage.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../../services/sweetalert.service';

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private storage = inject(StorageService);
  private sweetalert = inject(SweetalertService);
  private router = inject(Router);

  logOut(){
    this.sweetalert.basicAlert('Session ended', 'See you soon!', 'success');
    this.storage.removeSessionItem('token');
    this.router.navigate(['authentication']);
  }
}
