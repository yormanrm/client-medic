import { Component, inject } from '@angular/core';
import { StorageService } from '../../../../services/storage.service';
import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../../../../shared/service/confirm-dialog.service';

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private storage = inject(StorageService);
  private router = inject(Router);
  private confirmDialogService = inject(ConfirmDialogService);

  logOut() {
    this.confirmDialogService.showConfirmDialog(
      'Session ended',
      'See you soon!',
      () => {
        this.storage.removeSessionItem('token');
        this.router.navigate(['authentication']);
      },
      () => {},
      false // No mostrar el botón de cancelar
    );
  }
}
