import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { register } from 'swiper/element/bundle';
import { GET_PROPERTY_By_ID, GET_PROPERTY_LISTING, PROPERTY_CONTACT_FORM, RESEND_OTP, VERIFY_EMAIL } from '../../payload-model';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
register();



@Component({
  selector: 'app-property-details',
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, FormsModule, CommonModule, NgOtpInputModule,
    NgOtpInputComponent],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyDetailsComponent {

  @ViewChild('thumbsSwiper', { static: true })
  thumbsSwiper!: ElementRef;

  @ViewChild('otpInput', { static: false }) otpInput?: NgOtpInputComponent;

  contactForm: FormGroup;
  otpForm: FormGroup

  isContactFormDetails: boolean = true;
  isContactFormOtp: boolean = false;
  isContactFormSuccess: boolean = false;

  id!: any;

  propertyData: any = null;

  constructor(private fb: FormBuilder, private http: HttpService, private route: ActivatedRoute, public gS: GlobalService) {
    this.contactForm = this.fb.group({
      propertyId: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      number: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      countryCode: ['', Validators.required],
    });

    this.otpForm = fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    })
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    // Option A: read once (good for initial load)
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.getData(this.id);
    }

  }

  onOtpChange(otp: string) {
    this.otpForm.get('otp')?.setValue(otp);
  }


  getData(id: any) {
    let payload: GET_PROPERTY_By_ID = {
      id: id
    }

    this.http.getPropertyById(payload).then((res: any) => {
      if (res?.status == 'success' && res?.data) {
        let data = res.data;
        this.propertyData = data;
        console.log(this.propertyData,'propertyData');

        if (this.propertyData) {
          this.contactForm.patchValue({
            propertyId: this.propertyData?.id
          })
        }
      }

    })
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


  contactFormId: any = null;

  saveDetails() {

    let payload: PROPERTY_CONTACT_FORM = {
      firstName: this.contactForm.value?.firstName,
      lastName: this.contactForm.value?.lastName,
      email: this.contactForm.value?.email,
      countryCode: this.contactForm.value?.countryCode,
      phoneNumber: this.contactForm.value?.phoneNumber,
      propertyId: this.contactForm.value?.propertyId,
    }

    this.http.submitContactFrom(payload).then((res: any) => {
      if (res?.status == 'success') {
        this.contactFormId = res?.data?.id;
        this.isContactFormDetails = false;
        this.isContactFormOtp = true;
        this.isContactFormSuccess = false;
      }
    })

  }

  resendOtp() {
    const data: RESEND_OTP = {
      formId: this.contactFormId,
      type: 'PROPERTY'
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

  verifyOtp() {
    const data: VERIFY_EMAIL = {
      otp: this.otpForm.value.otp,
      formId: this.contactFormId,
      type: 'PROPERTY'
    };

    this.http.verifyEmail(data).then((res: any) => {
      if (res?.status === 'success') {
        this.gS.showSuccess('OTP verified successfully!');
        this.isContactFormDetails = false;
        this.isContactFormOtp = false;
        this.isContactFormSuccess = true;
      } else {
        this.gS.showError(res?.mesg || 'Something went wrong, please try again later.');
      }
    });
  }

  viewDocument(url: string) {
    window.open(url, "_blank");
  }


}
