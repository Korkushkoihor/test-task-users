import { AbstractControl, FormControl, Validators } from "@angular/forms";

export function getEmailFormControl(): AbstractControl {
  return new FormControl('', [
    Validators.required,
    Validators.email
  ]);
}
