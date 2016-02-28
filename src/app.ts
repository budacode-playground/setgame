///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="../typings/main.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {BoardComponent} from './app/board.component.ts';

// Global styling
require('./app/style/style.scss')

bootstrap(BoardComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
  .catch(err => console.error(err))


