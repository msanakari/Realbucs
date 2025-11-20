export interface BUY_FORM {
  id:number
  state: string
  propertyType:string
  propertySubType: string
  priceRange:string
  firstName: string
  lastName:string
  email: string
  countryCode:string
  phoneNumber:string
}

export interface SELL_FORM {
  id:number
  state: string
  propertyType:string
  propertySubType: string
  priceRange:string
  firstName: string
  lastName:string
  email: string
  countryCode:string
  phoneNumber:string
}

export interface BUY_SELL_FORM {
  id:number
  sellState: string
  sellPropertyType:string
  sellPropertySubType: string
  sellPriceRange:string
  buyState: string
  buyPropertyType:string
  buyPropertySubType: string
  buyPriceRange:string
  firstName: string
  lastName:string
  email: string
  countryCode:string
  phoneNumber:string
}

export interface AGENT_FORM {
  id:number
  agentId: string
  brokerageCompany:string
  experience: string
  states:string
  firstName: string
  lastName:string
  email: string
  countryCode:string
  phoneNumber:string
}

export interface AGENT_PREFRENCE {
  formId: number
  prefrenceType:string
  cashbackBuyer: string
  agentCommission: string
  propertyType:string
}

export interface VERIFY_EMAIL {
  otp: string
  formId:number
  type: string
}

export interface RESEND_OTP {
  formId:number
  type: string
}

export interface GET_PROPERTY_LISTING {
  pageNo:number
  pageSize: number
}

export interface GET_PROPERTY_By_ID {
  id:number
}

export interface PROPERTY_CONTACT_FORM {
  firstName: string
  lastName:string
  email: string
  countryCode:string
  phoneNumber:string
  propertyId:string
}


