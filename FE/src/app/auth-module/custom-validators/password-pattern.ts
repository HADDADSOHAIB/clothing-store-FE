import { AbstractControl, FormGroup } from '@angular/forms';


export function mustContainSpecialCaracter(control: AbstractControl) {
  if (!control.value)
    return null;

  let regex = /[!@#$%^&*(),.?":{}|<>]/;
  let valid = regex.test(control.value);
  if (!valid)
    return { mustContainSpecialCaracter: true };

  return null;
}

export function mustContainNumber(control: AbstractControl) {
    if (!control.value)
      return null;
  
    let regex: RegExp = /\d/;
    let valid = regex.test(control.value);
    if (!valid)
      return { mustContainNumber: true };
  
    return null;
}

export function mustContainUpperCase(control: AbstractControl) {
    if (!control.value)
      return null;
  
    let regex = /[A-Z]/;
    let valid = regex.test(control.value);
    if (!valid)
      return { mustContainUpperCase: true };
  
    return null;
}

export function mustContainLowerCase(control: AbstractControl) {
    if (!control.value)
      return null;
  
    let regex = /[a-z]/;
    let valid = regex.test(control.value);
    if (!valid)
      return { mustContainLowerCase: true };

    return null;
}