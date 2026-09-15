import { Component, inject } from '@angular/core';
import { Title } from '../../components/title/title';
import { Card } from '../../components/card/card';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, PercentPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Title, Card, TranslatePipe, DatePipe, CurrencyPipe, PercentPipe, SlicePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private translateService = inject(TranslateService);

  currentDate = new Date();
  subscriptionPrice = 9.99;
  progress = 0.75;

  get locale(): string {
    return this.translateService.getCurrentLang() === 'es' ? 'es-ES' : 'en-US';
  }
}
