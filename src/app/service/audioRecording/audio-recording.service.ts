import {Injectable} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import {Observable, Subject} from 'rxjs';
import {AudioRecord} from '../../model/audio-record.model';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {

  private stream;
  private recorder;
  private interval;
  private startTime;
  // tslint:disable-next-line:variable-name
  private _recorded = new Subject<AudioRecord>();
  // tslint:disable-next-line:variable-name
  private _recordingTime = new Subject<number>();
  // tslint:disable-next-line:variable-name
  private _recordingFailed = new Subject<string>();


  getRecordedBlob(): Observable<AudioRecord> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<number> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  startRecording() {

    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next(0);
    navigator.mediaDevices.getUserMedia({audio: true}).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this._recordingFailed.next();
    });

  }

  abortRecording() {
    this.stopMedia();
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

  stopRecording() {

    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          const title = encodeURIComponent('audio_' + new Date().getTime() + '.wav');
          this.stopMedia();
          this._recorded.next({blob, title});
        }
      }, () => {
        this.stopMedia();
        this._recordingFailed.next();
      });
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream.stop();
        this.stream = null;
      }
    }
  }
}
