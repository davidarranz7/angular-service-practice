import { Component } from '@angular/core';
import { Title } from '../../components/title/title';
import { Card } from '../../components/card/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [Title, Card, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
