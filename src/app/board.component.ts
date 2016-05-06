import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {DeckComponent} from './components/deck/deck.component.ts';
import {CardComponent} from './components/card/card.component.ts';
import {CardProps} from './config/card_props.ts';
import {Card} from './services/card.ts';
import {CardSet} from './services/card_set.ts';
import {Player} from './services/player.ts';

@Component({
  selector: 'board',
  template: require('./board.jade')(),
  styleUrls: [require('./board.scss')],
  providers: [Card],
  pipes: []
})
export class BoardComponent {
  deck: CardSet = new CardSet();
  visibleCards: CardSet = new CardSet();
  chosenCards: CardSet = new CardSet();
  sets: CardSet[] = [];
  isAnySet: boolean = false;
  player: Player = new Player();
  constructor() {
    // Shuffle the deck
    this.deck.generateDeck();
    this.deck.shuffle();

    // Draw the initial cards
    while (this.visibleCards.count() < 12) {
      this.visibleCards.add(this.deck.draw());
    }
    this.lookForSet()
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
      this.player.reward(50);

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
    if(this.isAnySet) {
      alert('There is a set on the board! Look harder')
      this.player.penality(10);
    } else {
      this.player.reward(10);
      this.visibleCards.add(this.deck.draw())
      while (this.visibleCards.count() % 3 !== 0) {
        this.visibleCards.add(this.deck.draw());
      }
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

  lookForSet() {
    this.isAnySet = false;
    let vc = this.visibleCards.cards;
    loop1:
    for (let i = 0; i < vc.length; i++) {
      for (let j = i+1; j < vc.length; j++) {
        for (let k = j+1; k < vc.length; k++) {
          let choosenCards = [vc[i], vc[j], vc[k]];
          let isSet = CardProps.propertyNames.reduce((prevVal, curVal, curIndex) => {
            let propertyValues = _.flatMap(choosenCards, `props.${curVal}`);
            let uniqueValues = _.uniq(propertyValues);
            return prevVal && uniqueValues.length !== 2;
          }, true);
          if (isSet) {
            this.isAnySet = true;
            break loop1;
          }
        }
      }
    }




    console.log()
  }

}
