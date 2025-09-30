import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormUtils } from '@app/utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);
  public formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    notifications: [true],
    terms: [false, Validators.requiredTrue],
  });

  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
