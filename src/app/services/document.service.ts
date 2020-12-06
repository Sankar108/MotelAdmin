import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  PageNumber = 'PageNumber';
  PageSize = 'PageSize';
  constructor(
    private _api: ApiService
  ) { }

  GetDocuments(pageNumber = '', pageSize = '') {
    let params: any;
    if (pageNumber && pageSize) {
      params = new HttpParams().set(this.PageNumber, pageNumber).set(this.PageSize, pageSize);
      params = '?' + params;
    }
    else {
      params = '';
    }
    return this._api.apiCaller(this._api.getMethod, this._api.documentURL + params);
  }
}
