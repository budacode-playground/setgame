import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { TimeFormatPipe } from './time-format.pipe';

@Component({
  selector: 'timer',
  template: require('./timer.jade')(),
  styleUrls: [require('./timer.component.scss')],
  directives: [],
  pipes: [TimeFormatPipe]
})

export class TimerComponent {
  timer: any;
  time: number = 0;

  constructor() {}

  start() {
    this.timer = Observable.timer(2000,1000);
    this.timer.subscribe(t => this.time = t);
  }

  stop() {
    this.timer.unsubscribe();
  }

  reset() {
    this.time = 0;
  }
  ngOnInit() {
    // this.start();
  }
}
