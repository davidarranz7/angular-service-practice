import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    TranslatePipe,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private translateService = inject(TranslateService);
  private router = inject(Router);

  protected readonly auth = inject(Auth);

  changeLanguage(language: 'es' | 'en') {
    this.translateService.use(language);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
