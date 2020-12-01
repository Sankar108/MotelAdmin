import { Injectable, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  
  public getMethod = 'get';
  public postMethod = 'post';
  public putMethod = 'put';
  public deleteMethod = 'delete';

  public localAPIpath = environment.localhost + 'api/';

  public readonly roomURL = this.localAPIpath + 'RoomDetails';
  public readonly registerSession = this.roomURL + 'RegisterSession';

  public apiCaller(type: string, url: string, data?: any, header?: any): any {
    if (type === 'get') {
      return this.get(url);
    }
    else if (type === 'post') {
      return this.post(url, data);
    }
    else if (type === 'put') {
      return this.put(url, data);
    }
    else if (type === 'delete') {
      return this.delete(url, data);
    }
  }

  private post(url: string, data: any): any {
    return this.http.post(url, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError),
      tap(result => {
        this.CheckInvalidToken(result);
      })
    );
  }
  private get(url: string): any {
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError),
      tap(result => {
        this.CheckInvalidToken(result);
      })
    );
  }

  private put(url: string, data: any): any {
    return this.http.put(url, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError),
      tap(result => {
        this.CheckInvalidToken(result);
      })
    );
  }

  private delete(url: string, data: any): any {
    const options = {
      headers: this.getHeaders(),
      body: data,
    };
    return this.http.delete(url, options).pipe(
      catchError(this.handleError),
      tap(result => {
        this.CheckInvalidToken(result);
      })
    );
  }

  public getHeaders(): HttpHeaders {
    var headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'accept': 'application/json',
    });
    return headers;
    // let token = this.cookiservice.get('token');
    // if (token != "") {
    //   return headers.append('Grid-Authorization-Token', token);
    // }
    // else {
    //   return headers;
    // }
  }

  CheckInvalidToken(result: any) {
    if (result) {
      let msg: string = result.message.toLocaleLowerCase();
      if (
        msg.includes('authentication failed') ||
        msg.includes('token expired') ||
        msg.includes('token header empty')
      ) {
        let btnLogout = document.getElementById('btnLogout');
        if (btnLogout) {
          btnLogout.click();
        }
      }
    }
  }

  private handleError(error: any): Promise<any> {
    try {
      if (error && error.status === 0) {
        const msg = `No internet connection`;
        return Promise.reject(msg);
      }

      if (isDevMode()) {
        console.log(error);
      }

      if (error && error.status && (error.status === 401 || error.status === 403)) {
        return Promise.reject(error);  //  AccessDeniedMsg
      }

      return Promise.reject('error' + (error.error || error.message));
    } catch (e) {
      const msg = `Something goes wrong,please try again later`;
      return Promise.reject(msg);
    }
  }
}
