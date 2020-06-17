import {Component, OnDestroy} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {UploadFileService} from '../../services/upload/upload-file.service';
import {AudioRecordingService} from '../../services/audioRecording/audio-recording.service';
import {TranscriptionResponse} from '../../models/transcription-response.model';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';


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
    audioRecord: Blob;
    statusMessage: string;
    responseError: boolean;
    transcription: TranscriptionResponse;
    isTranscriptionEmpty: boolean;
    transcriptionTxtURL: string;
    isWaitingForResponse = false;
    private sendRequestToASRSub: Subscription;
    private getBlobSub: Subscription;

    constructor(private audioRecordingService: AudioRecordingService,
                private sanitizer: DomSanitizer,
                private uploadFileService: UploadFileService,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {

        this.audioRecordingService.recordingFailed().subscribe(() => {
            this.isRecording = false;
        });

        this.audioRecordingService.getRecordedTime().subscribe((time) => {
            this.recordedTime = time;
            if (time >= 15) {
                this.stopRecording();
            }
        });

        this.getBlobSub = this.audioRecordingService.getRecordedBlob().subscribe((data) => {
            this.audioURL = this.createResourceURL(data);
            this.sanitizedAudioURL = this.sanitizeResourceURL(this.audioURL);
            this.audioRecord = data;
            this.isWaitingForResponse = true;
            this.sendRequestToASRSub = this.uploadFileService.pushFileToServer(data).subscribe(response => {
                    this.isWaitingForResponse = false;
                    this.statusMessage = 'OK';
                    this.transcription = new TranscriptionResponse(response.transcription);
                    this.responseError = false;
                    this.checkIfTranscriptionIsEmpty(this.transcription);
                },
                error => {
                    this.isWaitingForResponse = false;
                    this.statusMessage = 'Something went wrong';
                    this.responseError = true;
                }
            );
        });
    }

    ngOnDestroy(): void {
        this.audioRecordingService.stopMedia();
        URL.revokeObjectURL(this.audioURL);
        URL.revokeObjectURL(this.transcriptionTxtURL);
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
        this.isTranscriptionEmpty = null;
        URL.revokeObjectURL(this.transcriptionTxtURL);
    }

    createResourceURL(resource) {
        return URL.createObjectURL(resource);
    }

    sanitizeResourceURL(resourceURL) {
        return this.sanitizer.bypassSecurityTrustUrl(resourceURL);
    }

    copyToClipboard() {
        this.clipboard.copy(this.transcription.transcription);
        this.openSnackBar('Copied to clipboard!',2000);
    }

    openSnackBar(message: string, duration: number, action?: string) {
        this.snackBar.open(message, action, {
            duration
        });
    }
    checkIfTranscriptionIsEmpty(transcription: TranscriptionResponse) {
        this.isTranscriptionEmpty = transcription.transcription === null;
    }

    downloadTxt() {
        const blob = new Blob([this.transcription.transcription], {type: 'plain/text'});
        this.transcriptionTxtURL = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = this.transcriptionTxtURL;
        anchor.download = `transcription_${Date.now()}.txt`;
        const ev = new MouseEvent('click',{});
        anchor.dispatchEvent(ev);
        anchor.remove();
    }

    restartRecording() {
        this.clearRecordedData();
        this.startRecording();
    }
}
