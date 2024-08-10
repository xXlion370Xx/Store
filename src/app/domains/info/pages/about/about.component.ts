import { Component, inject, signal } from '@angular/core';
import { CounterComponent } from '@shared/components/counter/counter.component';
import { WaveAudioComponent } from "../../compoments/wave-audio/wave-audio.component";
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterComponent, WaveAudioComponent, HighlightDirective, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola')
  title = inject(Title);

  ngOnInit() {
    this.title.setTitle("About us");
  }

  ngOnDestroy() {
    this.title.setTitle("");
  }

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber)

  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value)
  }
}
