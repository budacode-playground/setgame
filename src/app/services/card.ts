import {Injectable} from '@angular/core';
import {CardProps} from '../config/card_props';

@Injectable()
export class Card {
  props: any;
  active: boolean = false;
  id: string = Math.random().toString(36).substring(7);

  constructor() {
    this.props = CardProps.getRandomProps();
  }

  setProps(props:any) {
    this.props = props;
  }

}
