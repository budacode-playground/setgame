import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CardSet} from '../../services/card_set.ts';

@Component({
  selector: 'deck',
  template: require('./deck.jade')(),
  styleUrls: [require('./deck.scss')],
  providers: [CardSet],
  directives: [],
  pipes: []
})
export class DeckComponent {
  @Input() deck: CardSet;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClick() {
    this.clickEvent.emit(null);
  }
}
