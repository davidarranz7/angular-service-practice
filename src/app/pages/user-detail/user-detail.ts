import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  user = signal<User | null>(null);

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user.set(data);
      },
      error: (err) => console.error('Error fetching user details: ', err),
    });
  }
}
