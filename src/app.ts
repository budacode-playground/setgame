import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {BoardComponent} from './app/board.component.ts';

// Global styling
require('./app/style/style.scss')

bootstrap(BoardComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
  .catch(err => console.error(err))


