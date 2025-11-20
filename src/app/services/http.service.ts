import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AGENT_FORM, AGENT_PREFRENCE, BUY_FORM, BUY_SELL_FORM, GET_PROPERTY_By_ID, GET_PROPERTY_LISTING, PROPERTY_CONTACT_FORM, RESEND_OTP, SELL_FORM, VERIFY_EMAIL } from '../payload-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = environment.apiEndPoint;
  constructor(private http: HttpClient) { }


  submitBuyForm(data: BUY_FORM) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('id', data.id);
      body = body.set('state', data.state);
      body = body.set('propertyType', data.propertyType);
      body = body.set('propertySubType', data.propertySubType);
      body = body.set('priceRange', data.priceRange);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('email', data.email);
      body = body.set('countryCode', data.countryCode);
      body = body.set('phoneNumber', data.phoneNumber);

      this.http.post(this.apiUrl + 'submit_buy_form', data).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  submitSellForm(data: SELL_FORM) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('id', data.id);
      body = body.set('state', data.state);
      body = body.set('propertyType', data.propertyType);
      body = body.set('propertySubType', data.propertySubType);
      body = body.set('priceRange', data.priceRange);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('email', data.email);
      body = body.set('countryCode', data.countryCode);
      body = body.set('phoneNumber', data.phoneNumber);

      this.http.post(this.apiUrl + 'submit_sell_form', data).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  submitBuySellForm(data: BUY_SELL_FORM) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('id', data.id);
      body = body.set('sellState', data.sellState);
      body = body.set('sellPropertyType', data.sellPropertyType);
      body = body.set('sellPropertySubType', data.sellPropertySubType);
      body = body.set('sellPriceRange', data.sellPriceRange);
      body = body.set('buyState', data.buyState);
      body = body.set('buyPropertyType', data.buyPropertyType);
      body = body.set('buyPropertySubType', data.buyPropertySubType);
      body = body.set('buyPriceRange', data.buyPriceRange);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('email', data.email);
      body = body.set('countryCode', data.countryCode);
      body = body.set('phoneNumber', data.phoneNumber);

      this.http.post(this.apiUrl + 'submit_buy_sell_form', data).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  submitAgentForm(data: AGENT_FORM) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('id', data.id);
      body = body.set('agentId', data.agentId);
      body = body.set('brokerageCompany', data.brokerageCompany);
      body = body.set('experience', data.experience);
      body = body.set('states', data.states);
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('email', data.email);
      body = body.set('countryCode', data.countryCode);
      body = body.set('phoneNumber', data.phoneNumber);

      this.http.post(this.apiUrl + 'submit_agent_form', data).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  submitAgentPrefrences(data: AGENT_PREFRENCE) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('formId', data.formId);
      body = body.set('prefrenceType', data.prefrenceType);
      body = body.set('cashbackBuyer', data.cashbackBuyer);
      body = body.set('agentCommission', data.agentCommission);
      body = body.set('propertyType', data.propertyType);


      this.http.post(this.apiUrl + 'update_agent', data).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  verifyEmail(data: VERIFY_EMAIL) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('otp', data.otp);
      body = body.set('formId', data.formId);
      body = body.set('type', data.type);

      this.http.post(this.apiUrl + 'verify_email', body).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  resendOtp(data: RESEND_OTP) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('formId', data.formId);
      body = body.set('type', data.type);

      this.http.post(this.apiUrl + 'resend_otp', body).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  getSettings() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'get_settings').subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  getPropertyListing(data: GET_PROPERTY_LISTING) {
    return new Promise((resolve, reject) => {
      let apiParam = {
        pageNo: data.pageNo,
        pageSize: data.pageSize,
      }
      this.http.get(this.apiUrl + 'getactivePropertylist', { params: apiParam }).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

  getPropertyById(data: GET_PROPERTY_By_ID) {
    return new Promise((resolve, reject) => {
      let apiParam = {
        id: data.id
      }
      this.http.get(this.apiUrl + 'getactivePropertybyid', { params: apiParam }).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }

   submitContactFrom(data: PROPERTY_CONTACT_FORM) {
    return new Promise((resolve, reject) => {
      let body = new HttpParams();
      body = body.set('firstName', data.firstName);
      body = body.set('lastName', data.lastName);
      body = body.set('email', data.email);
      body = body.set('countryCode', data.countryCode);
      body = body.set('phoneNumber', data.phoneNumber);
      body = body.set('propertyId', data.propertyId);

      this.http.post(this.apiUrl + 'propertyenquiry', data).subscribe({
        next: (res: any) => {
          resolve(res);
        }, error(err) {
          reject(err)
        }
      })
    })
  }
}
