import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {DeckComponent} from './components/deck/deck.component.ts';
import {CardComponent} from './components/card/card.component.ts';
import {CardProps} from './config/card_props.ts';
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
    while (this.visibleCards.count() < 12) {
      this.visibleCards.add(this.deck.draw());
    }
  }

  checkForSet() {
    // Number, color, saturation, shape check
    // TODO: Measuring time
    // TODO: provide an API for AI players

    const that = this;
    let isSet = CardProps.propertyNames.reduce((prevVal, curVal, curIndex) => {
      let propertyValues = _.flatMap(that.chosenCards.cards, `props.${curVal}`);
      let uniqueValues = _.uniq(propertyValues);
      return prevVal && uniqueValues.length !== 2;
    }, true);

    if (isSet) {
      this.sets.push(this.chosenCards);

      // Remove the visible cards and draw from deck
      while (this.chosenCards.count() > 0) {
        this.visibleCards.remove(this.chosenCards.draw());
        if(this.visibleCards.count() < 12) {
          this.visibleCards.add(this.deck.draw());
        }
      }
    } else {
      alert('Sorry, this is not a set');
      this.chosenCards.setEmpty();
    }

  }

  clickOnDeck($event: any) {
    this.visibleCards.add(this.deck.draw())
    while (this.visibleCards.count() % 3 !== 0) {
      this.visibleCards.add(this.deck.draw());
    }
  }

  clickOnCard($event: any) {
    $event.card.active = !$event.card.active;

    if ($event.card.active) {
      // If we already have 3 chosenCards...
      if (this.chosenCards.count() === 3) {

        alert('You can\'t select more than 3 cards');
        this.visibleCards.switchActivityById($event.card.id);

      } else {

        // If active, add it to the chosenCards
        this.chosenCards.add($event.card);
        // If we have 3 chosenCards, let's check
        if (this.chosenCards.count() === 3) {
          'checkoljuk'
          this.checkForSet();
        }

      }

    } else {
      this.chosenCards.remove($event.card);
    }


  }

}
