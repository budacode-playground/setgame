import {Injectable} from 'angular2/core';
import {Card} from './card.ts';
import {CardProps} from '../config/card_props.ts';

@Injectable()
export class CardSet {
  cards: Card[] = [];

  constructor() {}

  generateDeck() {
    CardProps.number.forEach((number) => {
      CardProps.color.forEach((color) => {
        CardProps.saturation.forEach((saturation) => {
          CardProps.shape.forEach((shape) => {

            const newCard = new Card();
            newCard.setProps({number, color, saturation, shape});

            this.cards.push(newCard);

          });
        });
      });
    });

    this.shuffle();
  }

  draw() {
    return this.cards.shift();
  }

  count() {
    return this.cards.length;
  }

  add(card: Card) {
    this.cards.push(card);
  }

  remove(card: Card) {
    // TODO
  }

  setEmpty() {
    this.cards = [];
  }

  shuffle() {
    this.cards = _.shuffle(this.cards);
  }

}
