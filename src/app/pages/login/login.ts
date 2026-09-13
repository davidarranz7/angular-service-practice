import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected loginError = false;

  protected readonly loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    this.loginError = false;
    this.auth.login(username, password).subscribe((isValid) => {
      if (!isValid) {
        this.loginError = true;
        return;
      }

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/home';
      this.router.navigateByUrl(returnUrl);
    });
  }
}
