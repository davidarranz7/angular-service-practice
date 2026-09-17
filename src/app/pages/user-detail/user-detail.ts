import { Component, inject, signal, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap/gsap-core';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  user = signal<User | null>(null);
  private userCardElement?: HTMLElement;

  @ViewChild('userCard', { read: ElementRef })
  set userCard(element: ElementRef<HTMLElement> | undefined) {
    this.userCardElement = element?.nativeElement;

    if (this.userCardElement) {
      this.animateUserCard();
    }
  }

  private animateUserCard(): void {
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    const userCard = this.userCardElement;

    if (!userCard) {
      return;
    }

    const media = gsap.matchMedia();

    media.add('(max-width: 600px)', () => {
      gsap.from(userCard, {
        x: -200,
        opacity: 0,
        scale: 0.7,
        duration: 1.2,
        ease: 'power2.out',
      });
    });

    media.add('(min-width: 601px)', () => {
      gsap.from(userCard, {
        y: -180,
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power2.out',
      });
    });
  }

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user.set(data);
      },
      error: (err) => console.error('Error fetching user details: ', err),
    });
  }
}
