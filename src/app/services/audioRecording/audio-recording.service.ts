import {Injectable} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment/moment';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioRecordingService {

    private stream;
    private recorder;
    private interval;
    private startTime;
    // tslint:disable-next-line:variable-name
    private _recorded = new Subject<Blob>();
    // tslint:disable-next-line:variable-name
    private _recordingTime = new Subject<number>();
    // tslint:disable-next-line:variable-name
    private _recordingFailed = new Subject<string>();


    getRecordedBlob(): Observable<Blob> {
        return this._recorded.asObservable();
    }

    getRecordedTime(): Observable<number> {
        return this._recordingTime.asObservable();
    }

    recordingFailed(): Observable<string> {
        return this._recordingFailed.asObservable();
    }

    public startRecording() {

        if (this.recorder) {
            return;
        }

        this._recordingTime.next(0);
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
            this.stream = stream;
            this.record();
        }).catch(error => {
            this._recordingFailed.next();
        });
    }

    private record() {

        this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
            type: 'audio',
            mimeType: 'audio/wav',
            numberOfAudioChannels: 1,
            desiredSampRate: 16000,
            disableLogs: true
        });
        this.recorder.record();
        this.startTime = moment();
        this.interval = setInterval(
            () => {
                const currentTime = moment();
                const diffTime = moment.duration(currentTime.diff(this.startTime));
                const time = diffTime.seconds();
                this._recordingTime.next(time);
            },
            1000
        );
    }

    public stopRecording() {

        if (this.recorder) {
            this.recorder.stop((blob) => {
                if (this.startTime) {
                    this.stopMedia();
                    this._recorded.next(blob);
                }
            }, () => {
                this.stopMedia();
                this._recordingFailed.next();
            });
        }
    }

    public stopMedia() {
        if (this.recorder) {
            this.recorder = null;
            clearInterval(this.interval);
            this.startTime = null;
            if (this.stream) {
                this.stream.getAudioTracks()[0].stop();
                this.stream.stop();
                this.stream = null;
            }
        }
    }
}
