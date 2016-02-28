import {Injectable} from 'angular2/core';
import {CardProps} from '../config/card_props';

@Injectable()
export class Card {
  props: any;

  constructor() {
    this.props = CardProps.getRandomProps();
  }

  setProps(props:any) {
    this.props = props;
  }
}
