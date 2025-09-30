import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '@app/utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  public formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group(
    {
      fullname: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
      email: [
        '',
        [Validators.required, Validators.pattern(FormUtils.emailPattern)],
        [this.formUtils.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(FormUtils.notOnlySpacesPattern),
        ],
        [this.formUtils.notStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword')],
    }
  );

  public onSubmit(): void {
    this.myForm.markAllAsTouched();
  }
}
