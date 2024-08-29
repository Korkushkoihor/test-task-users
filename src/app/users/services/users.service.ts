import { Injectable, Signal, signal } from '@angular/core';
import { User } from '../interfaces';

export const USERS: User[] = [
  {
    userName: 'Unknown',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johnDoe@yahoo.com',
    password: '1q2w3e4r5t',
    userType: 'Driver'
  },
  {
    userName: 'Spiderman',
    firstName: 'Peter',
    lastName: 'Parker',
    email: 'peterTheSpider@gmail.com',
    password: 'NetNetNet01',
    userType: 'Driver'
  },
  {
    userName: 'Wizzard',
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'harry.potter@gmail.com',
    password: 'MyL0veDjinni',
    userType: 'Administrator'
  }
]

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = USERS;

  public getUsers(): Signal<User[]> {
    return signal(this.users);
  }

  // Since "userName" can change we will update specific user by index
  public updateUser(user: User, userIndex: number): Signal<boolean> {
    const updatedUser = this.users[userIndex];
    if (updatedUser) {
      updatedUser.userName = user.userName;
      updatedUser.firstName = user.firstName;
      updatedUser.lastName = user.lastName;
      updatedUser.email = user.email;
      updatedUser.password = user.password;
      updatedUser.userType = user.userType;

      return signal(true);
    } else {
      return signal(false);
    }
  }

  public createUser(user: User): Signal<boolean> {
    this.users.push(user);

    return signal(true);
  }

  // Since "userName" can change we will delete user by index
  public deleteUser(userIndex: number): Signal<boolean> {
    if (this.users[userIndex]) {
      this.users = this.users.filter((user, index) => index !== userIndex);
    }

    return signal(true);
  }
}
