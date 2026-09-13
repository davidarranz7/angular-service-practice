import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  login() {
    this.auth.login();

    const returnURL = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/home';
    this.router.navigateByUrl(returnURL);
  }
}
