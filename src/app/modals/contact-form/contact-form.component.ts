import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryISO, NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-contact-form',
  imports: [NgxIntlTelInputModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  @Input() id = 'myModal';

  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();
  @Input() formId: any;
  @Input() contactFormData: any;

  mobileNo: any = null;

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      number: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      countryCode: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this.formId!==null && this.contactFormData) {
      this.contactForm.patchValue({
        firstName: this.contactFormData?.firstName || '',
        lastName: this.contactFormData?.lastName || '',
        email: this.contactFormData?.email || '',
        number: this.contactFormData?.number || '',
        phoneNumber: this.contactFormData?.phoneNumber || '',
        countryCode: this.contactFormData?.countryCode || ''
      });
    }
  }

  close() {
    this.onClose.emit();
  }

  saveDetails() {
    this.onSave.emit(this.contactForm);
  }

  onPhoneChange() {
    const phoneData = this.contactForm.get('number')?.value;

    if (phoneData && phoneData.e164Number && phoneData.dialCode) {
      const dialCode = phoneData.dialCode;
      const e164Number = phoneData.e164Number;

      const number = e164Number.replace(dialCode, '');

      this.contactForm.patchValue({
        phoneNumber: number,
        countryCode: dialCode
      });
    }
  }
}
