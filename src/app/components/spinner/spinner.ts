import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loading } from '../../core/services/loading';

@Component({
  selector: 'app-spinner',
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  protected readonly loading$ = inject(Loading).loading$;
}
