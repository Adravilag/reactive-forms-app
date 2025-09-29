import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  // Método para obtener el texto del error según el código de error
  static getTextError(erros: ValidationErrors): string {
    for (const key of Object.keys(erros)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `Mínimo ${erros[key]?.requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${erros[key]?.min}`;
        default:
          return 'Error desconocido';
      }
    }
    return 'Error desconocido';
  }

  // Expresiones regulaes para validaciones
  static readonly emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly passwordPattern: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,15}$';
  static readonly namePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  static readonly numberPattern: string = '^[0-9]*$';

  // Métodos estáticos para validaciones de formularios
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean {
    return formArray.controls[index].touched && formArray.controls[index].invalid;
  }
}
