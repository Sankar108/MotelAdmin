import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  PageNumber = 'PageNumber';
  PageSize = 'PageSize';
  constructor(
    private _api: ApiService
  ) { }


  GetCountries() {
    return this._api.apiCaller(this._api.getMethod, 'assets/country.json');
  }

  GetStates() {
    return this._api.apiCaller(this._api.getMethod, 'assets/state.json');
  }
}
