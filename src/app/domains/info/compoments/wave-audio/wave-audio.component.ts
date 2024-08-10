import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrls: ['./wave-audio.component.css']
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave') container!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ws = WaveSurfer.create({
        url: this.audioUrl,
        container: this.container.nativeElement
      });
      this.ws.on('play', () => this.isPlaying.set(true));
      this.ws.on('pause', () => this.isPlaying.set(false));
    }
  }

  playPause() {
    if (isPlatformBrowser(this.platformId)) {
      this.ws.playPause();
    }
  }
}
