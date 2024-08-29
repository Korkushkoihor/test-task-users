import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces';
import { differentPasswordValidator, getPasswordConfirmationFormControl, getPasswordFormControl, EmailDirective, TooltipService, getEmailFormControl } from '../../../shared';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EmailDirective
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  public form = new FormGroup({
    userName: new FormControl<string | null>(null, Validators.compose([Validators.required])),
    firstName: new FormControl<string | null>(null, Validators.compose([Validators.required])),
    lastName: new FormControl<string | null>(null, Validators.compose([Validators.required])),
    email: getEmailFormControl(),
    userType: new FormControl<'Administrator' | 'Driver' | null>(null, Validators.compose([Validators.required])),
    password: getPasswordFormControl(),
    confirmPassword: getPasswordConfirmationFormControl(),
  }, { validators: differentPasswordValidator('password', 'confirmPassword')});

  public readonly userInfo = input<{user: User, index: number} | null>();

  public readonly updateUsers = output<boolean>();
  public readonly dismissForm = output<boolean>();

  constructor(
    private usersService: UsersService,
    private tooltipService: TooltipService) {
    effect(() => {
      if (this.userInfo()) {
        this.form.reset();
        this.form.patchValue({
          userName: this.userInfo()?.user?.userName,
          firstName: this.userInfo()?.user?.firstName,
          lastName: this.userInfo()?.user?.lastName,
          email: this.userInfo()?.user?.email,
          userType: this.userInfo()?.user?.userType,
          password: this.userInfo()?.user?.password
        })
      } else {
        this.form.reset();
      }
    });
  }

  public submitForm(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const value = this.form.value;

      if (this.userInfo()) {
        const updateResult = this.usersService.updateUser({
          userName: value?.userName ?? '',
          firstName: value?.firstName ?? '',
          lastName: value?.lastName ?? '',
          email: value?.email,
          password: value?.password,
          userType: value['userType'] ?? 'Driver',
        }, this.userInfo()?.index ?? -1);

        if (updateResult()) {
          this.tooltipService.showSuccessMessage('User was updated successfully!');
        } else {
          this.tooltipService.showWarningMessage('Something went wrong, user was not updated!');
        }
      } else {
        const createResult = this.usersService.createUser({
          userName: value?.userName ?? '',
          firstName: value?.firstName ?? '',
          lastName: value?.lastName ?? '',
          email: value?.email,
          password: value?.password,
          userType: value['userType'] ?? 'Driver',
        });

        if (createResult()) {
          this.tooltipService.showSuccessMessage('User was created successfully!');
        } else {
          this.tooltipService.showWarningMessage('Something went wrong, user was not created!');
        }
      }

      this.form.reset();
      this.updateUsers.emit(true);
    } else {
      this.tooltipService.showWarningMessage('Please fill out the form!');
    }
  }

  public handleDeleteClick() {
    const deleteResult = this.usersService.deleteUser(this.userInfo()?.index ?? -1);
    if (deleteResult()) {
      this.tooltipService.showSuccessMessage('User was successfully deleted!');
    } else {
      this.tooltipService.showWarningMessage('User was not deleted!');
    }
    this.updateUsers.emit(true);
  }
}
