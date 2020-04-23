import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private http: HttpClient) {
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', environment.api + '/records', data, {
      responseType: 'json'
    });
    return this.http.request(newRequest);
  }
}
