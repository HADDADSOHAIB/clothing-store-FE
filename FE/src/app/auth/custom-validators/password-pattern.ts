import { AbstractControl, FormGroup } from '@angular/forms';


export function mustContainSpecialCaracter(control: AbstractControl) {
  if (!control.value) {
    return null;
  }

  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  const valid = regex.test(control.value);
  if (!valid) {
    return { mustContainSpecialCaracter: true };
  }

  return null;
}

export function mustContainNumber(control: AbstractControl) {
    if (!control.value) {
      return null;
    }

    const regex: RegExp = /\d/;
    const valid = regex.test(control.value);
    if (!valid) {
      return { mustContainNumber: true };
    }

    return null;
}

export function mustContainUpperCase(control: AbstractControl) {
    if (!control.value) {
      return null;
    }

    const regex = /[A-Z]/;
    const valid = regex.test(control.value);
    if (!valid) {
      return { mustContainUpperCase: true };
    }

    return null;
}

export function mustContainLowerCase(control: AbstractControl) {
    if (!control.value) {
      return null;
    }

    const regex = /[a-z]/;
    const valid = regex.test(control.value);
    if (!valid) {
      return { mustContainLowerCase: true };
    }

    return null;
}
