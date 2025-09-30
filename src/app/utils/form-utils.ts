import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class FormUtils {
  // Expresiones regulares para validaciones
  static readonly namePattern = '([a-zA-Z]+) ([a-zA-Z]+)'; // Nombre y apellido
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'; // Email básico
  static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$'; // No solo espacios

  /**
   * Devuelve el texto del error según el código de error
   */
  static getTextError(errors: ValidationErrors, pattern?: string): string {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `Mínimo ${errors[key]?.requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors[key]?.min}`;
        case 'password':
          return `La contraseña debe ser mayor de 6 caracteres`;
        case 'confirmPassword':
          return `Las contraseñas deben de ser iguales`;
        case 'email':
          return `El valor ingresado no tiene formato de correo`;
        case 'emailTaken':
          return `El correo ya fue tomado por otro usuario`;
        case 'notStrider':
          return `El nombre de usuario no puede ser "strider"`;
        case 'fullname':
          return `El nombre y apellido son obligatorios`;
        case 'pattern': {
          switch (pattern) {
            case this.namePattern:
              return 'El nombre y apellido deben estar separados por un espacio';
            case this.emailPattern:
              return 'El valor ingresado no tiene formato de correo';
            case this.notOnlySpacesPattern:
              return 'El valor no puede ser solo espacios';
            default:
              return 'El valor no cumple con el patrón requerido';
          }
        }
        default:
          return 'Error desconocido: ' + key;
      }
    }
    return 'Error desconocido';
  }

  /**
   * Indica si el campo es inválido y ha sido tocado
   */
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName]?.errors && form.controls[fieldName].touched;
  }

  /**
   * Devuelve el mensaje de error del campo, mostrando el patrón si corresponde
   */
  static getFieldError(
    form: FormGroup,
    fieldName: string,
    pattern?: string
  ): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return FormUtils.getTextError(errors, pattern);
  }

  /**
   * Devuelve el mensaje de error de un campo en un FormArray
   */
  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  /**
   * Indica si el campo de un FormArray es inválido y ha sido tocado
   */
  static isValidFieldInArray(formArray: FormArray, index: number): boolean {
    return formArray.controls[index].touched && formArray.controls[index].invalid;
  }

  /**
    * Validador personalizado para verificar que dos campos sean iguales
  */
  static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(fieldOne)?.value;
      const field2Value = formGroup.get(fieldTwo)?.value;
      return field1Value === field2Value ? null : { passWordsNotEqual: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep(1500);
    const formValue = control.value?.trim().toLowerCase();
    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }
    return null;
  }

  static async notStrider(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep(1500);
    const formValue = control.value?.trim().toLowerCase();
    if (formValue === 'strider') {
      return { notStrider: true };
    }
    return null;
  }

}
