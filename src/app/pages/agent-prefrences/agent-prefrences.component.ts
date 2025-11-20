import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { AGENT_PREFRENCE } from '../../payload-model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-agent-prefrences',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agent-prefrences.component.html',
  styleUrl: './agent-prefrences.component.scss'
})
export class AgentPrefrencesComponent {

  prefrenceForm: FormGroup;

  prefrenceType = [
    { name: 'Buying Only' },
    { name: 'Selling Only' },
    { name: 'Both' }
  ]

  propertyType = [
    { name: 'Residential' },
    { name: 'Commercial' },
    { name: 'Both' }
  ]

  buyerCashback = [
    { name: '0.5%' },
    { name: '1%' },
    { name: '1.5%' },
    { name: '2%' },
    { name: '2.5%' }
  ]

  agentCommission = [
    { name: '0.5%' },
    { name: '1%' },
    { name: '1.5%' },
    { name: '2%' }
  ]

  formId: any = '';

  constructor(private fb: FormBuilder, public gS: GlobalService, private http: HttpService) {
    this.prefrenceForm = this.fb.group({
      formId: ['', Validators.required],
      propertyType: ['', Validators.required],
      prefrenceType: ['', Validators.required],
      cashbackBuyer: [''],
      agentCommission: ['']
    });

    this.formId = gS.getNavigationExtras()?.['formId'];
    console.log(this.formId, 'formId');

    if (this.formId) {
      this.prefrenceForm.patchValue({
        formId: this.formId
      })
    }
  }

  selectValue(type: string, value: any) {
    switch (type) {
      case 'prefrenceType': {
        this.prefrenceForm.patchValue({
          prefrenceType: value
        });

        if (value == 'Buying Only') {
          this.prefrenceForm.get('cashbackBuyer')?.setValidators([Validators.required]);
          this.prefrenceForm.get('agentCommission')?.clearValidators();
          this.prefrenceForm.patchValue({
            agentCommission: ''
          });
        } else if (value == 'Selling Only') {
          this.prefrenceForm.get('agentCommission')?.setValidators([Validators.required]);
          this.prefrenceForm.get('cashbackBuyer')?.clearValidators();
          this.prefrenceForm.patchValue({
            cashbackBuyer: ''
          });
        } else if (value == 'Both') {
          this.prefrenceForm.get('agentCommission')?.setValidators([Validators.required]);
          this.prefrenceForm.get('cashbackBuyer')?.setValidators([Validators.required]);
        }
        this.prefrenceForm.get('agentCommission')?.updateValueAndValidity();
        this.prefrenceForm.get('cashbackBuyer')?.updateValueAndValidity();
        break;
      }

      case 'cashbackBuyer': {
        this.prefrenceForm.patchValue({
          cashbackBuyer: value
        });
        break;
      }

      case 'agentCommission': {
        this.prefrenceForm.patchValue({
          agentCommission: value
        });
        break;
      }

      case 'propertyType': {
        this.prefrenceForm.patchValue({
          propertyType: value
        });
        break;
      }
    }
  }

  submitPrefrence() {
    if (this.prefrenceForm.valid) {
      let payload: AGENT_PREFRENCE = {
        formId: this.prefrenceForm.value.formId,
        prefrenceType: this.prefrenceForm.value.prefrenceType,
        cashbackBuyer: this.prefrenceForm.value.cashbackBuyer,
        agentCommission: this.prefrenceForm.value.agentCommission,
        propertyType:this.prefrenceForm.value.propertyType,
      }

      this.http.submitAgentPrefrences(payload).then((res: any) => {
        if (res?.status === 'success') {
          this.gS.navigate('');
        }
      });
    }
  }

}
