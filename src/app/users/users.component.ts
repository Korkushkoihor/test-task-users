import { NgFor } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { UsersTableComponent } from './components';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersService } from './services/users.service';
import { User } from './interfaces';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    UsersTableComponent,
    UserFormComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public showUserForm = false;
  public selectedUserInfoToEdit: WritableSignal<{user: User, index: number} | null> = signal(null);
  protected readonly usersService = inject(UsersService);
  protected users = this.usersService.getUsers();

  clickedCreateUser() {
    this.selectedUserInfoToEdit.set(null);
    this.showUserForm = true;
  }

  handleClickOnUser(userInfo: {user: User, index: number}) {
    this.selectedUserInfoToEdit.set(userInfo);
    this.showUserForm = true;
  }

  handleUpdateUsers() {
    this.users = this.usersService.getUsers();
    this.selectedUserInfoToEdit.set(null);
    this.showUserForm = false;
  }

  handleDismissForm() {
    this.selectedUserInfoToEdit.set(null);
    this.showUserForm = false;
  }
}
