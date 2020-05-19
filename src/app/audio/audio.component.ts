import {Component, OnDestroy} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AudioRecord} from '../model/audio-record.model';
import {UploadFileService} from '../service/upload/upload-file.service';
import {AudioRecordingService} from '../service/audioRecording/audio-recording.service';
import {TranscriptionResponse} from '../model/transcription-response.model';


@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnDestroy {
    isRecording = false;
    recordedTime;
    audioURL;
    sanitizedAudioURL;
    audioRecord: AudioRecord;
    statusMessage: string;
    responseError: boolean;
    public transcription: TranscriptionResponse;

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
            this.audioURL = this.createResourceURL(data.audio);
            this.sanitizedAudioURL = this.sanitizeResourceURL(this.audioURL);
            this.audioRecord = data;
            const file = new File([this.audioRecord.audio], this.audioRecord.title,
                {type: 'audio/wav'});
            this.uploadFileService.pushFileToServer(file).subscribe(response => {
                    this.statusMessage = 'OK';
                    this.transcription = new TranscriptionResponse(response.transcription);
                    this.responseError = false;
                },
                error => {
                    this.statusMessage = 'Something went wrong';
                    this.responseError = true;
                }
            );
        });
    }

    ngOnDestroy(): void {
        this.audioRecordingService.stopMedia();
        URL.revokeObjectURL(this.audioURL);
    }

    startRecording() {
        if (!this.isRecording) {
            this.isRecording = true;
            this.audioRecordingService.startRecording();
        }
    }

    stopRecording() {
        if (this.isRecording) {
            this.audioRecordingService.stopRecording();
            this.isRecording = false;
        }
    }

    clearRecordedData() {
        URL.revokeObjectURL(this.audioURL);
        this.audioURL = null;
        this.statusMessage = null;
        this.responseError = null;
        this.sanitizedAudioURL = null;
        this.transcription = null;
    }

    createResourceURL(resource) {
        return URL.createObjectURL(resource);
    }

    sanitizeResourceURL(resourceURL) {
        return this.sanitizer.bypassSecurityTrustUrl(resourceURL);
    }
}
