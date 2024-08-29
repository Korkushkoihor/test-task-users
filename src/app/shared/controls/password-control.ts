import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function getPasswordFormControl(): AbstractControl {
  return new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
  ]);
}

export function getPasswordConfirmationFormControl(matchFieldName = 'password'): AbstractControl {
  return new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
    matchField(matchFieldName),
  ]);
}

export function differentPasswordValidator(currentPasswordFieldName: string, newPasswordFieldName: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentPassword = control.get(currentPasswordFieldName);
    const newPassword = control.get(newPasswordFieldName);

    const isPasswordMatch = (currentPassword && newPassword && newPassword.value && newPassword.value === currentPassword.value);
    return !isPasswordMatch ? { samePasswordError: true } : null;
  };
}

function matchField(formField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let otherField: AbstractControl | null = null;

    if (control.parent) {
      otherField = control.parent.get(formField);
    }

    return otherField && (otherField.value == control.value) ? null : { fieldMismatch: true };
  };
}
