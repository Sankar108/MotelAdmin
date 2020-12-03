import { Injectable } from '@angular/core';
import { CustomerModel, CustomerModel2 } from '../models/customer';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _api: ApiService) { }

  AddCustomer(customerModel: CustomerModel) {
    return this._api.apiCaller(this._api.postMethod, this._api.customerURL, customerModel);
  }

  GetCustomerList() {
    return this._api.apiCaller(this._api.getMethod, this._api.customerURL);
  }
}
