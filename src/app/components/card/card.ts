import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { gsap } from 'gsap';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements AfterViewInit {
  @Input() imageUrl = '';
  @Input() text = '';

  @ViewChild('cardElement', { read: ElementRef })
  cardElement!: ElementRef<HTMLElement>;

  private setX!: (valeue: number) => void;
  private setY!: (value: number) => void;
  private cardBounds!: DOMRect;

  ngAfterViewInit(): void {
    this.setX = gsap.quickSetter(this.cardElement.nativeElement, 'x', 'px') as (
      value: number,
    ) => void;
    this.setY = gsap.quickSetter(this.cardElement.nativeElement, 'y', 'px') as (
      value: number,
    ) => void;
  }

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

  onMouseEnter(): void {
    this.cardBounds = this.cardElement.nativeElement.getBoundingClientRect();
  }

  onMouseMove(event: MouseEvent): void {
    const centerX = this.cardBounds.left + this.cardBounds.width / 2;
    const centerY = this.cardBounds.top + this.cardBounds.height / 2;
    const moveX = (event.clientX - centerX) * 0.35;
    const moveY = (event.clientY - centerY) * 0.35;

    this.setX(moveX);
    this.setY(moveY);
  }

  onMouseLeave(): void {
    gsap.to(this.cardElement.nativeElement, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}
