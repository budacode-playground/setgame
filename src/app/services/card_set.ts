import {Injectable} from '@angular/core';
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

  switchActivityById(cardId) {
    let targetCard = this.findById(cardId);
    targetCard.active = !targetCard.active;
  }

  findById(cardId) {
    return _.find(this.cards, { id: cardId });
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
    _.remove(this.cards, { id: card.id });
  }

  setEmpty() {
    this.cards = [];
  }

  shuffle() {
    this.cards = _.shuffle(this.cards);
  }

}
