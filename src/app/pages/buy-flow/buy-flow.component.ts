import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ContactFormComponent } from '../../modals/contact-form/contact-form.component';
import { VerifyOtpComponent } from '../../modals/verify-otp/verify-otp.component';
import { SuccessModalComponent } from '../../modals/success-modal/success-modal.component';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import { BUY_FORM } from '../../payload-model';

@Component({
  selector: 'app-buy-flow',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContactFormComponent,
    RouterModule,
    VerifyOtpComponent,
    SuccessModalComponent
  ],
  templateUrl: './buy-flow.component.html',
  styleUrl: './buy-flow.component.scss'
})
export class BuyFlowComponent {

  currentStep: number = 1;

  USStates = [
    { name: 'Alabama' },
    { name: 'Alaska' },
    { name: 'Arizona' },
    { name: 'Arkansas' },
    { name: 'California' },
    { name: 'Colorado' },
    { name: 'Connecticut' },
    { name: 'Delaware' },
    { name: 'Florida' },
    { name: 'Georgia' },
    { name: 'Hawaii' },
    { name: 'Idaho' },
    { name: 'Illinois' },
    { name: 'Indiana' },
    { name: 'Iowa' },
    { name: 'Kansas' },
    { name: 'Kentucky' },
    { name: 'Louisiana' },
    { name: 'Maine' },
    { name: 'Maryland' },
    { name: 'Massachusetts' },
    { name: 'Michigan' },
    { name: 'Minnesota' },
    { name: 'Mississippi' },
    { name: 'Missouri' },
    { name: 'Montana' },
    { name: 'Nebraska' },
    { name: 'Nevada' },
    { name: 'New Hampshire' },
    { name: 'New Jersey' },
    { name: 'New Mexico' },
    { name: 'New York' },
    { name: 'North Carolina' },
    { name: 'North Dakota' },
    { name: 'Ohio' },
    { name: 'Oklahoma' },
    { name: 'Oregon' },
    { name: 'Pennsylvania' },
    { name: 'Rhode Island' },
    { name: 'South Carolina' },
    { name: 'South Dakota' },
    { name: 'Tennessee' },
    { name: 'Texas' },
    { name: 'Utah' },
    { name: 'Vermont' },
    { name: 'Virginia' },
    { name: 'Washington' },
    { name: 'West Virginia' },
    { name: 'Wisconsin' },
    { name: 'Wyoming' }
  ];

  propertType = [
    { name: 'Residential' },
    { name: 'Commercial' }
  ]

  propertTypeResidential = [
    { name: 'Single Family' },
    { name: 'Condo' },
    { name: 'Town House' },
    { name: 'Duplex' },
    { name: 'Mobile Home' }
  ]

  priceResidential = [
    { name: '$100K-$250K', min: 100000, max: 250000 },
    { name: '$250K-$500K', min: 250000, max: 500000 },
    { name: '$500K-$750K', min: 500000, max: 750000 },
    { name: '$750K-$1M', min: 750000, max: 1000000 },
    { name: '$1M-$2M', min: 1000000, max: 2000000 }
  ];

  propertTypeCommercial = [
    { name: 'Retail' },
    { name: 'Land' },
    { name: 'Industrial' },
    { name: 'Multi-family' }
  ]

  priceCommercial = [
    { name: 'Below $1M', min: 0, max: 1000000 },
    { name: 'Between $1M and $3M', min: 1000000, max: 3000000 },
    { name: 'Between $3M and $10M', min: 3000000, max: 10000000 },
    { name: 'Above $10M', min: null, max: 10000000 }
  ];


  buyForm: FormGroup;

  openContactModal: boolean = false;
  openOtpModal: boolean = false;
  openSuccessModal: boolean = false;

  constructor(private fb: FormBuilder, public gS: GlobalService, private http: HttpService) {
    this.buyForm = this.fb.group({
      id: [''],
      state: ['', Validators.required],
      propertyType: ['', Validators.required],
      propertySubType: ['', Validators.required],
      priceRange: ['', Validators.required],
      contactForm: this.fb.group({})
    });
  }

  nextPrevStep(step: number) {
    this.currentStep = step;
  }

  get currentPropertyOptions(): any[] {
    const type = this.buyForm.get('propertyType')?.value;
    return type === 'Residential' ? this.propertTypeResidential : this.propertTypeCommercial;
  }

  get currentPriceRangeOptions(): any[] {
    const type = this.buyForm.get('propertyType')?.value;
    return type === 'Residential' ? this.priceResidential : this.priceCommercial;
  }

  selectValue(type: string, value: any) {
    switch (type) {
      case 'state': {
        this.buyForm.patchValue({
          state: value
        });
        break;
      }

      case 'propertyType': {
        this.buyForm.patchValue({
          propertyType: value
        });
        this.buyForm.patchValue({
          propertySubType: ''
        });
        break;
      }

      case 'propertySubType': {
        this.buyForm.patchValue({
          propertySubType: value
        });
        this.buyForm.patchValue({
          priceRange: ''
        });
        break;
      }
    }
  }

  savingNewHome: any = '';
  savingOldHome: any = '';

  selectPrice(value: any) {
    this.buyForm.patchValue({
      priceRange: value?.name
    });

    if (value?.max) {
      this.savingNewHome = ((value?.max * 3) / 100) * 0.90;
      this.savingOldHome = ((value?.max * 3) / 100) * 0.80;
    }
  }

  handleContactForm(form: FormGroup) {
    this.buyForm.setControl('contactForm', form);
    if (this.buyForm.valid) {
      this.submitForm();
    }
  }

  handelOtpVerify() {
    this.openOtpModal = false;
    this.openSuccessModal = true;
  }

  handleClose() {
    this.openContactModal = false;
    this.openOtpModal = false;
    this.openSuccessModal = false;
  }

  successClose() {
    this.openSuccessModal = false;
    this.gS.navigate('/');
  }

  changeEmail(){
    this.openOtpModal = false;
    this.openContactModal = true;
  }

  openContactForm() {
    this.openContactModal = true;
  }

  closeOtpModal() {
    this.openOtpModal = false;
    this.gS.navigate('');
  }

  submitForm() {
    if (this.buyForm.valid) {

      const contactForm = this.buyForm.get('contactForm')?.value;

      const data: BUY_FORM = {
        id: this.buyForm.get('id')?.value || null,
        state: this.buyForm.value.state,
        propertyType: this.buyForm.value.propertyType,
        propertySubType: this.buyForm.value.propertySubType,
        priceRange: this.buyForm.value.priceRange,
        firstName: contactForm.firstName,
        lastName: contactForm.lastName,
        email: contactForm.email,
        countryCode: contactForm.countryCode,
        phoneNumber: contactForm.phoneNumber
      };

      this.http.submitBuyForm(data).then((res: any) => {
        if (res?.status === 'success') {
          this.buyForm.patchValue({
            id: res?.data?.id
          });
          this.openContactModal = false;
          setTimeout(() => {
            this.openOtpModal = true;
          }, 100);
        }
      })
    }
  }
}
