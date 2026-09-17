import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { gsap } from 'gsap';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() imageUrl = '';
  @Input() text = '';

  @ViewChild('cardElement', { read: ElementRef })
  cardElement!: ElementRef<HTMLElement>;

  animateCard(): void {
    gsap.fromTo(
      this.cardElement.nativeElement,
      {
        scale: 1,
      },
      {
        scale: 1.12,
        duration: 0.35,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut',
      },
    );
  }
}
