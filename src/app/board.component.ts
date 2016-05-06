import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {DeckComponent} from './components/deck/deck.component.ts';
import {CardComponent} from './components/card/card.component.ts';
import {TimerComponent} from './components/timer/timer.component.ts';
import {CardProps} from './config/card_props.ts';
import {Card} from './services/card.ts';
import {CardSet} from './services/card_set.ts';
import {Player} from './services/player.ts';

@Component({
  selector: 'board',
  template: require('./board.jade')(),
  styleUrls: [require('./board.scss')],
  directives: [NgFor, DeckComponent, CardComponent, TimerComponent],
  providers: [Card],
  pipes: []
})
export class BoardComponent {
  deck: CardSet = new CardSet();
  visibleCards: CardSet = new CardSet();
  chosenCards: CardSet = new CardSet();
  sets: CardSet[] = [];
  visibleSet: CardSet = new CardSet();
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
        if(this.visibleCards.count() < 12 && this.deck.count() > 0 ) {
          this.visibleCards.add(this.deck.draw());
        }
        if(this.visibleCards.count() === 0) {
          this.end();
        }
      }
      this.lookForSet();
    } else {
      alert('Sorry, this is not a set');
      this.chosenCards.setEmpty(true);
    }

  }

  clickOnDeck($event: any) {
    if(this.isAnySet) {
      alert('There is a set on the board! Look harder');
      this.player.penality(10);
    } else {
      this.player.reward(10);
      this.visibleCards.add(this.deck.draw())
      while (this.visibleCards.count() % 3 !== 0) {
        this.visibleCards.add(this.deck.draw());
      }
      this.lookForSet()
    }
  }

  clickOnCard($event: any) {

    if (!$event.card.active) {

      this.chosenCards.add($event.card, true);
      // If we have 3 chosenCards, let's check
      if (this.chosenCards.count() === 3) {
        'checkoljuk'
        this.checkForSet();
      }

    } else {
      this.chosenCards.remove($event.card, true);
    }

  }

  lookForSet() {
    this.isAnySet = false;
    let vc = this.visibleCards.cards;
    loop1:
    for (let i = 0; i < vc.length; i++) {
      for (let j = i+1; j < vc.length; j++) {
        for (let k = j+1; k < vc.length; k++) {
          let choosenCards = new CardSet();
          choosenCards.add(vc[i]);
          choosenCards.add(vc[j]);
          choosenCards.add(vc[k]);
          let isSet = CardProps.propertyNames.reduce((prevVal, curVal, curIndex) => {
            let propertyValues = _.flatMap(choosenCards.cards, `props.${curVal}`);
            let uniqueValues = _.uniq(propertyValues);
            return prevVal && uniqueValues.length !== 2;
          }, true);
          if (isSet) {
            this.visibleSet = choosenCards;
            this.isAnySet = true;
            break loop1;
          }
        }
      }
    }
  }

  help() {
    this.chosenCards.setEmpty(true);
    this.visibleSet.shuffle();
    let vs = this.visibleSet.cards;
    for (let i = 0; i < vs.length; i++) {
      if(!vs[i].active && !vs[i].highlighted) {
        vs[i].highlight(true);
        break;
      }
    }
  }
  end() {
    alert(this.player.points);
  }
}
