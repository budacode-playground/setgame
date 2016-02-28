import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {DeckComponent} from './components/deck/deck.component.ts';
import {CardComponent} from './components/card/card.component.ts';
import {Card} from './services/card.ts';
import {CardSet} from './services/card_set.ts';

@Component({
  selector: 'board',
  template: require('./board.jade')(),
  styleUrls: [require('./board.scss')],
  directives: [NgFor, DeckComponent, CardComponent],
  providers: [Card],
  pipes: []
})
export class BoardComponent {
  deck: CardSet = new CardSet();
  visibleCards: CardSet = new CardSet();
  chosenCards: CardSet = new CardSet();
  sets: CardSet[] = [];
  constructor() {
    // Shuffle the deck
    this.deck.generateDeck();
    this.deck.shuffle();

    // Draw the initial cards
    while (this.visibleCards.count() < 9) {
      this.visibleCards.add(this.deck.draw());
    }
    console.log(this.visibleCards.cards);
  }

  checkForSet() {
    // Number, color, saturation, shape check
    // TODO: check for set
    // TODO: working remove functionality
    // TODO: handling inactivity of the cards from the board
    // TODO: Measuring time
    // TODO: provide an API for AI players

    this.sets.push(this.chosenCards);

    // Remove the visible cards
    while (this.chosenCards.count() > 0) {
      this.visibleCards.remove(this.chosenCards.draw());
    }
  }

  clickOnDeck($event: any) {
    this.visibleCards.add(this.deck.draw());
  }

  clickOnCard($event: any) {

    if (this.chosenCards.count() >= 3) {

      alert('You can\'t select more than 3 cards');

    } else {

      if ($event.active) {
        this.chosenCards.add($event.card);
        if (this.chosenCards.count() === 3) {
          this.checkForSet();
        }
      } else {
        this.chosenCards.remove($event.card);
      }

    }

  }

}
