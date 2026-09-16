import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { CurrencyPipe, DatePipe, JsonPipe, PercentPipe, SlicePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';

import { Title } from '../../components/title/title';
import { Card } from '../../components/card/card';
import { Auth } from '../../core/services/auth';
import { SaludoPipe } from '../../pipes/saludo-pipe';
import { DoblePipe } from '../../pipes/doble-pipe';
import { ResaltarPipe } from '../../pipes/resaltar-pipe';
import { EdadPipe } from '../../pipes/edad-pipe';

@Component({
  selector: 'app-home',
  imports: [
    Title,
    Card,
    TranslatePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    SlicePipe,
    JsonPipe,
    SaludoPipe,
    DoblePipe,
    ResaltarPipe,
    EdadPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  private readonly translateService = inject(TranslateService);

  readonly auth = inject(Auth);
  readonly numero = 5;

  @ViewChild('homeTitle')
  homeTitle!: ElementRef<HTMLDivElement>;

  @ViewChild('homeSubtitle')
  homeSubtitle!: ElementRef<HTMLParagraphElement>;

  @ViewChild('homeButton')
  homeButton!: ElementRef<HTMLButtonElement>;

  @ViewChildren('homeCard', { read: ElementRef })
  homeCards!: QueryList<ElementRef<HTMLElement>>;

  currentDate = new Date();
  subscriptionPrice = 9.99;
  progress = 0.75;

  get locale(): string {
    return this.translateService.getCurrentLang() === 'es' ? 'es-ES' : 'en-US';
  }

  ngAfterViewInit(): void {
    const cards = this.homeCards.map((card) => card.nativeElement);

    const timeline = gsap.timeline();

    timeline
      .from(this.homeTitle.nativeElement, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
      .from(this.homeSubtitle.nativeElement, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
      .from(this.homeButton.nativeElement, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })
      .from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out',
      });
  }
}
