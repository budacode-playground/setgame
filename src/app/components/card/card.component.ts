import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgFor, NgClass} from 'angular2/common';
import {Card} from '../../services/card';

@Component({
  selector: 'card',
  template: require('./card.jade')(),
  styleUrls: [require('./card.scss')],
  directives: [NgFor, NgClass],
  providers: [Card],
  pipes: []
})

export class CardComponent {
  @Input() card: Card;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  active: boolean = false;

  constructor() {}

  onClick() {
    this.active = !this.active;
    this.clickEvent.emit({ card: this.card, active: this.active });
  }

  getNumber() {
    return new Array(this.card.props.number);
  }

  getClasses() {
    return [this.card.props.saturation, this.card.props.color, this.card.props.number, this.card.props.shape].join(' ');
  }
}
