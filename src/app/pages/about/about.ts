import { Component, OnInit, inject, signal, computed } from '@angular/core';
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

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    MatIcon,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  users = signal<User[]>([]);
  nameSearch = signal('');
  nameFilter = signal('');
  cityFilter = signal('');

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
}
