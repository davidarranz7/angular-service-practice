import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  users = signal<User[]>([]);

  private userService = inject(UserService);

  private router = inject(Router);

  goToUserDetail(id: number) {
    this.router.navigate(['/user', id]);
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
