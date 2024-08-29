import { Component, input, output } from '@angular/core';
import { User } from '../../interfaces';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  public readonly users = input<User[]>([]);
  public readonly clickedOnUser = output<{user: User, index: number}>();
}
