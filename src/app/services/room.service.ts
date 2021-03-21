import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookRoomModel, RoomModel } from '../models/room';
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
    return this._api.apiCaller(this._api.getMethod, this._api.roomURL + "/" + roomId);
  }

  GetOccupiedRoomList() {
    return this._api.apiCaller(this._api.getMethod, this._api.OccupiedRoomURL);
  }

  GetOccupiedRoomDetailsById(roomId: any) {
    return this._api.apiCaller(this._api.getMethod, this._api.OccupiedRoomURL + "/" + roomId);
  }

  BookRoom(booRoomModel: BookRoomModel) {
    return this._api.apiCaller(this._api.postMethod, this._api.OccupiedRoomURL, booRoomModel);
  }

  GetRoomById1(roomId: any) {
    let params = new HttpParams().set('id', roomId);
    return this._api.apiCaller(this._api.getMethod, this._api.roomURL + "/" + roomId);
  }

  SetCleanedRoom(roomId: any) {
    let params = new HttpParams().set('id', roomId);
    return this._api.apiCaller(this._api.getMethod, this._api.setCleanedRoom + "/" + roomId);
  }

  GetAllRoomCount() {
    return this._api.apiCaller(this._api.getMethod, this._api.GetAllRoomCount);
  }

  GetAllOccupiedRoom() {
    return this._api.apiCaller(this._api.getMethod, this._api.GetAllOccupiedRoom);
  }

  GetAllVacantRoom() {
    return this._api.apiCaller(this._api.getMethod, this._api.GetAllVacantRoom);
  }

  GetAllUnderCleaningRoom() {
    return this._api.apiCaller(this._api.getMethod, this._api.GetAllUnderCleaningRoom);
  }

  CheckOutRoom(roomId: any, customerId: any) {
    return this._api.apiCaller(this._api.getMethod, this._api.checkOutRoom + "/" + roomId + "/" + customerId);
  }

  AddRoomDetails(formData: FormData) {
    return this._api.apiCaller(this._api.postMethod, this._api.roomURL, formData);
  }
}
