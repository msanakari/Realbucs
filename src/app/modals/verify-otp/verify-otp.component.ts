import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { HttpService } from '../../services/http.service';
import { GlobalService } from '../../services/global.service';
import { RESEND_OTP, VERIFY_EMAIL } from '../../payload-model';

@Component({
  selector: 'app-verify-otp',
  imports: [
    CommonModule,
    NgOtpInputModule,
    NgOtpInputComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss'
})
export class VerifyOtpComponent {

  @ViewChild('otpInput', { static: false }) otpInput?: NgOtpInputComponent;

  @Output() onClose = new EventEmitter<any>();
  @Output() otpVerified = new EventEmitter<any>();
   @Output() changeEmail = new EventEmitter<any>();
  @Input() email: string = '';
  @Input() formId: any = '';
  @Input() type: string = '';

  otpForm: FormGroup

  constructor(private fb: FormBuilder, private http: HttpService, public gS: GlobalService) {
    this.otpForm = fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    })
  }

  ngOnInit() {
    console.log('Email:', this.email);
    console.log('Form ID:', this.formId);
    console.log('Type:', this.type);
  }

  close() {
    this.onClose.emit();
  }

  onOtpChange(otp: string) {
    this.otpForm.get('otp')?.setValue(otp);
  }

  changeEmailId() {
    this.changeEmail.emit();
  }


  verifyOtp() {
    const data: VERIFY_EMAIL = {
      otp: this.otpForm.value.otp,
      formId: this.formId,
      type: this.type
    };

    this.http.verifyEmail(data).then((res: any) => {
      if (res?.status === 'success') {
        this.gS.showSuccess('OTP verified successfully!');
        this.otpVerified.emit();
      } else {
        this.gS.showError(res?.mesg || 'Something went wrong, please try again later.');
      }
    });
  }

  resendOtp() {
    const data: RESEND_OTP = {
      formId: this.formId,
      type: this.type
    };

    this.http.resendOtp(data).then((res: any) => {
      if (res?.status === 'success') {
        this.gS.showSuccess('OTP sent successfully.');
        this.otpInput?.setValue('');
      } else {
        this.gS.showError(res?.mesg || 'Something went wrong, please try again later.');
      }
    });
  }


}
