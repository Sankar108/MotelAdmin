import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomModel } from '../models/room';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  PageNumber = 'PageNumber';
  PageSize = 'PageSize';
  constructor(
    private _api: ApiService
  ) { }

  AddRooms(roomModel: RoomModel) {
    return this._api.apiCaller(this._api.postMethod, this._api.roomURL, roomModel);
  }

  GetRooms(pageNumber = '', pageSize = '') {
    let params: any;
    if (pageNumber && pageSize) {
      params = new HttpParams().set(this.PageNumber, pageNumber).set(this.PageSize, pageSize);
      params = '?' + params;
    }
    else {
      params = '';
    }
    return this._api.apiCaller(this._api.getMethod, this._api.roomURL + params);
  }

  GetRoomById(roomId: any) {
    let params= new HttpParams().set('id', roomId);
    return this._api.apiCaller(this._api.getMethod, this._api.roomURL + "?" + params);
  }
}
