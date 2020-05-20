import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TranscriptionResponse} from '../../model/transcription-response.model';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    constructor(private http: HttpClient) {
    }

    pushFileToServer(blob: Blob): Observable<TranscriptionResponse> {
        const url = environment.api + '/transcription';
        const formData = new FormData();
        formData.append('file', blob);
        return this.http.post<TranscriptionResponse>(url, formData);
    }
}
