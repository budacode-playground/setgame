import {Component} from 'angular2/core';
import {Http} from 'angular2/http';


@Component({
  selector: 'about',
  template: require('./about.jade')(),
  styleUrls: [require('./about.scss')],
  providers: [],
  directives: [],
  pipes: []
})
export class About {

  constructor(http:Http) {

  }
}
