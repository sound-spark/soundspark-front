import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AudioRecord} from '../model/audio-record.model';
import {UploadFileService} from '../service/upload/upload-file.service';
import {AudioRecordingService} from '../service/audioRecording/audio-recording.service';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit, OnDestroy {
    isRecording = false;
    recordedTime;
    blobUrl;
    blob: AudioRecord;

    constructor(private audioRecordingService: AudioRecordingService,
                private sanitizer: DomSanitizer,
                private uploadFileService: UploadFileService) {

        this.audioRecordingService.recordingFailed().subscribe(() => {
            this.isRecording = false;
        });

        this.audioRecordingService.getRecordedTime().subscribe((time) => {
            this.recordedTime = time;
            if (time >= 15) {
                this.stopRecording();
            }
        });

        this.audioRecordingService.getRecordedBlob().subscribe((data) => {
            this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
            this.blob = data;
            const file = new File([this.blob.blob], `user_record_${new Date().getTime()}.wav`,
                {type: 'audio/wav'});
            this.uploadFileService.pushFileToStorage(file).subscribe();
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.abortRecording();
    }

    startRecording() {
        if (!this.isRecording) {
            this.isRecording = true;
            this.audioRecordingService.startRecording();
        }
    }

    abortRecording() {
        if (this.isRecording) {
            this.isRecording = false;
            this.audioRecordingService.abortRecording();
        }
    }

    stopRecording() {
        if (this.isRecording) {
            this.audioRecordingService.stopRecording();
            this.isRecording = false;
        }

    }

    clearRecordedData() {
        this.blobUrl = null;
    }
}
