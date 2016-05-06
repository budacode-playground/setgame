import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgFor, NgClass} from '@angular/common';
import {Card} from '../../services/card';

@Component({
  selector: 'card',
  template: require('./card.jade')(),
  styleUrls: [require('./card.component.scss')],
  directives: [NgFor, NgClass],
  providers: [Card],
  pipes: []
})

export class CardComponent {
  @Input() card: Card;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClick() {
    // this.card.active = !this.card.active;
    this.clickEvent.emit({ card: this.card });
  }

  getNumber() {
    return new Array(this.card.props.number);
  }

  getClasses() {
    return [this.card.props.saturation, this.card.props.color, this.card.props.number, this.card.props.shape].join(' ');
  }
}
