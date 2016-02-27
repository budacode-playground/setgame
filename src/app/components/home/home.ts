import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  template: require('./home.jade')(),
  styleUrls: [require('./home.scss')],
  providers: [],
  directives: [],
  pipes: []
})
export class Home {

  constructor() {}

}
