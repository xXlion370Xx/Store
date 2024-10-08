
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor(@Inject(PLATFORM_ID) private plataformId: object) { // Never async
    console.log('construnctor');
    console.log('-'.repeat(10));
    // before show component
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // after render
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    if (isPlatformBrowser(this.plataformId)) {
      this.counterRef = window.setInterval(() => {
        console.log('run interval')
        this.counter.update(statePrev => statePrev + 1);
      }, 1000)
    }
  }

  ngAfterViewInit() {
    // after render
    // hijos ya fueron pintandos
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    if (isPlatformBrowser(this.plataformId)) {

      window.clearInterval(this.counterRef);
    }
  }

  doSomething() {
    console.log('change duration')
    // async
  }

}

@Component({
  selector: 'mi-componente',
  template: ' Este elemento se mostrará si mostrarElemento es true.',
})
export class MiComponente {
  mostrarElemento: boolean = false;
}
