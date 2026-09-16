import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '../../core/services/auth';
import { gsap } from 'gsap';

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

  @ViewChild('leftLine') leftLine!: ElementRef<SVGLineElement>;
  @ViewChild('rightLine') rightLine!: ElementRef<SVGLineElement>;
  @ViewChild('bottomLine') bottomLine!: ElementRef<SVGLineElement>;

  changeLanguage(language: 'es' | 'en') {
    this.translateService.use(language);
  }

  animateBrand(): void {
    const leftLine = this.leftLine.nativeElement;
    const rightLine = this.rightLine.nativeElement;
    const bottomLine = this.bottomLine.nativeElement;

    const lines = [leftLine, rightLine, bottomLine];

    gsap.killTweensOf(lines);

    const timeline = gsap.timeline();

    timeline
      .to(leftLine, {
        x: -2,
        y: 1,
        rotate: -180,
        scale: 0.9,
        duration: 0.35,
        transformOrigin: 'center',
        ease: 'power2.inOut',
      })
      .to(leftLine, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.25,
        ease: 'back.out(1.8)',
      })

      .to(rightLine, {
        x: 2,
        y: 1,
        rotate: 180,
        scale: 0.9,
        duration: 0.35,
        transformOrigin: 'center',
        ease: 'power2.inOut',
      })
      .to(rightLine, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.25,
        ease: 'back.out(1.8)',
      })

      .to(bottomLine, {
        y: 2,
        rotate: 180,
        scale: 0.9,
        duration: 0.35,
        transformOrigin: 'center',
        ease: 'power2.inOut',
      })
      .to(bottomLine, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.25,
        ease: 'back.out(1.8)',
      });
  }

  resetBrand(): void {
    const lines = [
      this.leftLine.nativeElement,
      this.rightLine.nativeElement,
      this.bottomLine.nativeElement,
    ];

    gsap.killTweensOf(lines);

    gsap.to(lines, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
