import { Component, inject } from '@angular/core';
import { Title } from '../../components/title/title';
import { Card } from '../../components/card/card';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, PercentPipe, SlicePipe, JsonPipe } from '@angular/common';
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
export class Home {
  private translateService = inject(TranslateService);
  readonly auth = inject(Auth);
  readonly numero = 5;

  currentDate = new Date();
  subscriptionPrice = 9.99;
  progress = 0.75;

  get locale(): string {
    return this.translateService.getCurrentLang() === 'es' ? 'es-ES' : 'en-US';
  }
}
