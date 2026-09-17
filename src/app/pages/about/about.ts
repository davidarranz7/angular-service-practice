import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    MatIcon,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit, AfterViewInit {
  users = signal<User[]>([]);
  nameSearch = signal('');
  nameFilter = signal('');
  cityFilter = signal('');

  @ViewChild('usersTable')
  usersTable!: ElementRef<HTMLDivElement>;

  private userService = inject(UserService);

  private router = inject(Router);

  goToUserDetail(id: number) {
    this.router.navigate(['/user', id]);
  }

  filteredUsers = computed(() => {
    const name = this.nameFilter().toLocaleLowerCase();
    const city = this.cityFilter().toLocaleLowerCase();

    return this.users().filter((user) => {
      const matchesName = user.name.toLocaleLowerCase().includes(name);
      const matchesCity = city == '' || user.address.city.toLocaleLowerCase() == city;
      return matchesName && matchesCity;
    });
  });

  onNameSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.nameSearch.set(value);

    if (value.trim() === '') {
      this.nameFilter.set('');
    }
  }

  nameSuggestions = computed(() => {
    const search = this.nameSearch().trim().toLocaleLowerCase();

    if (search === '') {
      return [];
    }

    return this.users().filter((user) => user.name.toLocaleLowerCase().includes(search));
  });

  onNameSelected(event: MatAutocompleteSelectedEvent) {
    this.nameFilter.set(event.option.value);
  }

  onNameSearchEnter() {
    this.nameFilter.set(this.nameSearch().trim().toLocaleLowerCase());
  }

  cities = computed(() => {
    return [...new Set(this.users().map((user) => user.address.city))];
  });

  onCityFilterChange(city: string) {
    this.cityFilter.set(city);
  }

  resetFilters() {
    this.nameSearch.set('');
    this.nameFilter.set('');
    this.cityFilter.set('');
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => console.error('Error fetching users: ', err),
    });
  }

  ngAfterViewInit(): void {
    gsap.from(this.usersTable.nativeElement, {
      y: 250,
      x: -120,
      opacity: 0,
      scale: 0.75,
      rotate: -8,
      duration: 1.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: this.usersTable.nativeElement,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }
}
