webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
	///<reference path="../typings/main.d.ts" />
	var browser_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(221);
	var router_1 = __webpack_require__(236);
	var board_component_ts_1 = __webpack_require__(263);
	// Global styling
	__webpack_require__(282);
	browser_1.bootstrap(board_component_ts_1.BoardComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS])
	    .catch(function (err) { return console.error(err); });


/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(22);
	var common_1 = __webpack_require__(116);
	var deck_component_ts_1 = __webpack_require__(264);
	var card_component_ts_1 = __webpack_require__(275);
	var card_props_ts_1 = __webpack_require__(267);
	var card_ts_1 = __webpack_require__(266);
	var card_set_ts_1 = __webpack_require__(265);
	var BoardComponent = (function () {
	    function BoardComponent() {
	        this.deck = new card_set_ts_1.CardSet();
	        this.visibleCards = new card_set_ts_1.CardSet();
	        this.chosenCards = new card_set_ts_1.CardSet();
	        this.sets = [];
	        // Shuffle the deck
	        this.deck.generateDeck();
	        this.deck.shuffle();
	        // Draw the initial cards
	        while (this.visibleCards.count() < 9) {
	            this.visibleCards.add(this.deck.draw());
	        }
	    }
	    BoardComponent.prototype.checkForSet = function () {
	        // Number, color, saturation, shape check
	        // TODO: Measuring time
	        // TODO: provide an API for AI players
	        var that = this;
	        var isSet = card_props_ts_1.CardProps.propertyNames.reduce(function (prevVal, curVal, curIndex) {
	            var propertyValues = _.flatMap(that.chosenCards.cards, "props." + curVal);
	            var uniqueValues = _.uniq(propertyValues);
	            return prevVal && uniqueValues.length !== 2;
	        }, true);
	        if (isSet) {
	            this.sets.push(this.chosenCards);
	            // Remove the visible cards and draw from deck
	            while (this.chosenCards.count() > 0) {
	                this.visibleCards.remove(this.chosenCards.draw());
	                this.visibleCards.add(this.deck.draw());
	            }
	        }
	        else {
	            alert('Sorry, this is not a set');
	        }
	    };
	    BoardComponent.prototype.clickOnDeck = function ($event) {
	        this.visibleCards.add(this.deck.draw());
	    };
	    BoardComponent.prototype.clickOnCard = function ($event) {
	        if ($event.card.active) {
	            // If we already have 3 chosenCards...
	            if (this.chosenCards.count() === 3) {
	                alert('You can\'t select more than 3 cards');
	                this.visibleCards.switchActivityById($event.card.id);
	            }
	            else {
	                // If active, add it to the chosenCards
	                this.chosenCards.add($event.card);
	                // If we have 3 chosenCards, let's check
	                if (this.chosenCards.count() === 3) {
	                    this.checkForSet();
	                }
	            }
	        }
	        else {
	            this.chosenCards.remove($event.card);
	        }
	    };
	    BoardComponent = __decorate([
	        core_1.Component({
	            selector: 'board',
	            template: __webpack_require__(279)(),
	            styleUrls: [__webpack_require__(280)],
	            directives: [common_1.NgFor, deck_component_ts_1.DeckComponent, card_component_ts_1.CardComponent],
	            providers: [card_ts_1.Card],
	            pipes: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], BoardComponent);
	    return BoardComponent;
	})();
	exports.BoardComponent = BoardComponent;


/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(22);
	var card_set_ts_1 = __webpack_require__(265);
	var DeckComponent = (function () {
	    function DeckComponent() {
	        this.clickEvent = new core_1.EventEmitter();
	    }
	    DeckComponent.prototype.onClick = function () {
	        this.clickEvent.emit(null);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', card_set_ts_1.CardSet)
	    ], DeckComponent.prototype, "deck", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], DeckComponent.prototype, "clickEvent", void 0);
	    DeckComponent = __decorate([
	        core_1.Component({
	            selector: 'deck',
	            template: __webpack_require__(268)(),
	            styleUrls: [__webpack_require__(271)],
	            providers: [card_set_ts_1.CardSet],
	            directives: [],
	            pipes: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DeckComponent);
	    return DeckComponent;
	})();
	exports.DeckComponent = DeckComponent;


/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(22);
	var card_ts_1 = __webpack_require__(266);
	var card_props_ts_1 = __webpack_require__(267);
	var CardSet = (function () {
	    function CardSet() {
	        this.cards = [];
	    }
	    CardSet.prototype.generateDeck = function () {
	        var _this = this;
	        card_props_ts_1.CardProps.number.forEach(function (number) {
	            card_props_ts_1.CardProps.color.forEach(function (color) {
	                card_props_ts_1.CardProps.saturation.forEach(function (saturation) {
	                    card_props_ts_1.CardProps.shape.forEach(function (shape) {
	                        var newCard = new card_ts_1.Card();
	                        newCard.setProps({ number: number, color: color, saturation: saturation, shape: shape });
	                        _this.cards.push(newCard);
	                    });
	                });
	            });
	        });
	        this.shuffle();
	    };
	    CardSet.prototype.switchActivityById = function (cardId) {
	        var targetCard = this.findById(cardId);
	        targetCard.active = !targetCard.active;
	    };
	    CardSet.prototype.findById = function (cardId) {
	        return _.find(this.cards, { id: cardId });
	    };
	    CardSet.prototype.draw = function () {
	        return this.cards.shift();
	    };
	    CardSet.prototype.count = function () {
	        return this.cards.length;
	    };
	    CardSet.prototype.add = function (card) {
	        this.cards.push(card);
	    };
	    CardSet.prototype.remove = function (card) {
	        _.remove(this.cards, { id: card.id });
	    };
	    CardSet.prototype.setEmpty = function () {
	        this.cards = [];
	    };
	    CardSet.prototype.shuffle = function () {
	        this.cards = _.shuffle(this.cards);
	    };
	    CardSet = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], CardSet);
	    return CardSet;
	})();
	exports.CardSet = CardSet;


/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(22);
	var card_props_1 = __webpack_require__(267);
	var Card = (function () {
	    function Card() {
	        this.active = false;
	        this.id = Math.random().toString(36).substring(7);
	        this.props = card_props_1.CardProps.getRandomProps();
	    }
	    Card.prototype.setProps = function (props) {
	        this.props = props;
	    };
	    Card = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Card);
	    return Card;
	})();
	exports.Card = Card;


/***/ },

/***/ 267:
/***/ function(module, exports) {

	var propertyNames = ['number', 'saturation', 'shape', 'color'];
	var number = [1, 2, 3];
	var saturation = ['striped', 'empty', 'full'];
	var color = ['red', 'green', 'blue'];
	var shape = ['circle', 'rectangle', 'square'];
	var getRandomProps = function () {
	    return {
	        number: number[Math.floor(Math.random() * 3)],
	        saturation: saturation[Math.floor(Math.random() * 3)],
	        color: color[Math.floor(Math.random() * 3)],
	        shape: shape[Math.floor(Math.random() * 3)],
	    };
	};
	var CardProps = {
	    number: number,
	    saturation: saturation,
	    color: color,
	    shape: shape,
	    propertyNames: propertyNames,
	    getRandomProps: getRandomProps,
	};
	exports.CardProps = CardProps;


/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(269);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/Users/marcellkiss/dev/setgame/src/app/components/deck/deck.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/Users/marcellkiss/dev/setgame/src/app/components/deck/deck.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/Users/marcellkiss/dev/setgame/src/app/components/deck/deck.jade" ));
	buf.push("<div (click)=\"onClick()\" class=\"m-deck c-card\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/Users/marcellkiss/dev/setgame/src/app/components/deck/deck.jade" ));
	buf.push("<p>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
	buf.push("Deck");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</p>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/Users/marcellkiss/dev/setgame/src/app/components/deck/deck.jade" ));
	buf.push("<p>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, jade_debug[0].filename ));
	buf.push("/{{ deck.cards.length }} cards/");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</p>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, ".m-deck.c-card((click)='onClick()')\n  p Deck\n  p /{{ deck.cards.length }} cards/\n\n");
	}
	}

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(270).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },

/***/ 270:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(272);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(274)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./deck.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./deck.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(273)();
	// imports
	
	
	// module
	exports.push([module.id, ".m-deck {\n  background-color: saddlebrown;\n  color: white;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n", ""]);
	
	// exports


/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(22);
	var common_1 = __webpack_require__(116);
	var card_1 = __webpack_require__(266);
	var CardComponent = (function () {
	    function CardComponent() {
	        this.clickEvent = new core_1.EventEmitter();
	    }
	    CardComponent.prototype.onClick = function () {
	        this.card.active = !this.card.active;
	        this.clickEvent.emit({ card: this.card });
	    };
	    CardComponent.prototype.getNumber = function () {
	        return new Array(this.card.props.number);
	    };
	    CardComponent.prototype.getClasses = function () {
	        return [this.card.props.saturation, this.card.props.color, this.card.props.number, this.card.props.shape].join(' ');
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', card_1.Card)
	    ], CardComponent.prototype, "card", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], CardComponent.prototype, "clickEvent", void 0);
	    CardComponent = __decorate([
	        core_1.Component({
	            selector: 'card',
	            template: __webpack_require__(276)(),
	            styleUrls: [__webpack_require__(277)],
	            directives: [common_1.NgFor, common_1.NgClass],
	            providers: [card_1.Card],
	            pipes: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CardComponent);
	    return CardComponent;
	})();
	exports.CardComponent = CardComponent;


/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(269);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/Users/marcellkiss/dev/setgame/src/app/components/card/card.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/Users/marcellkiss/dev/setgame/src/app/components/card/card.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/Users/marcellkiss/dev/setgame/src/app/components/card/card.jade" ));
	buf.push("<div [ngClass]=\"{active: card.active}\" (click)=\"onClick()\" class=\"m-card c-card\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/Users/marcellkiss/dev/setgame/src/app/components/card/card.jade" ));
	buf.push("<div *ngFor=\"#item of getNumber()\" class=\"m-card__formation {{ getClasses() }}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, ".m-card.c-card([ngClass]='{active: card.active}', (click)='onClick()')\n  .m-card__formation(*ngFor='#item of getNumber()', class='{{ getClasses() }}')\n");
	}
	}

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(278);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(274)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./card.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/sass-loader/index.js!./card.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(273)();
	// imports
	
	
	// module
	exports.push([module.id, ".m-card {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .m-card.active {\n    background-color: lightgrey; }\n  .m-card__formation {\n    width: 30px;\n    height: 30px;\n    margin-bottom: 7px; }\n    .m-card__formation.red {\n      border: 1px solid red; }\n      .m-card__formation.red.striped {\n        background: -webkit-repeating-linear-gradient(45deg, red, red 5px, white 5px, white 10px);\n        background: repeating-linear-gradient(45deg, red, red 5px, white 5px, white 10px); }\n      .m-card__formation.red.full {\n        background-color: red; }\n    .m-card__formation.green {\n      border: 1px solid green; }\n      .m-card__formation.green.striped {\n        background: -webkit-repeating-linear-gradient(45deg, green, green 5px, white 5px, white 10px);\n        background: repeating-linear-gradient(45deg, green, green 5px, white 5px, white 10px); }\n      .m-card__formation.green.full {\n        background-color: green; }\n    .m-card__formation.blue {\n      border: 1px solid blue; }\n      .m-card__formation.blue.striped {\n        background: -webkit-repeating-linear-gradient(45deg, blue, blue 5px, white 5px, white 10px);\n        background: repeating-linear-gradient(45deg, blue, blue 5px, white 5px, white 10px); }\n      .m-card__formation.blue.full {\n        background-color: blue; }\n    .m-card__formation.rectangle {\n      width: 50px; }\n    .m-card__formation.circle {\n      border-radius: 50%; }\n", ""]);
	
	// exports


/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(269);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<div class=\"m-board\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<h1>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
	buf.push("Welcome to the board");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</h1>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<div class=\"m-board__main\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<div class=\"m-board__deckContainer\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 6, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<deck [deck]=\"deck\" (clickEvent)=\"clickOnDeck($event)\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</deck>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 7, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<div class=\"m-board__setCounter\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, jade_debug[0].filename ));
	buf.push("Collected sets: {{ sets.length }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 8, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<div class=\"m-board__cardContainer\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 9, "/Users/marcellkiss/dev/setgame/src/app/board.jade" ));
	buf.push("<card *ngFor=\"#card of visibleCards.cards\" [card]=\"card\" (clickEvent)=\"clickOnCard($event)\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</card>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, ".m-board\n  h1 Welcome to the board\n\n  .m-board__main\n    .m-board__deckContainer\n      deck([deck]='deck', (clickEvent)='clickOnDeck($event)')\n      .m-board__setCounter Collected sets: {{ sets.length }}\n    .m-board__cardContainer\n      card(*ngFor='#card of visibleCards.cards', [card]='card', (clickEvent)='clickOnCard($event)')\n");
	}
	}

/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(281);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(274)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./board.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./board.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(273)();
	// imports
	
	
	// module
	exports.push([module.id, ".m-board {\n  padding: 50px; }\n  .m-board__main {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  .m-board__deckContainer {\n    margin-right: 50px; }\n  .m-board__cardContainer {\n    width: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap; }\n    .m-board__cardContainer card {\n      margin: 0 5px 5px 0; }\n  .m-board__setCounter {\n    margin-top: 10px; }\n", ""]);
	
	// exports


/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(283);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(274)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(273)();
	// imports
	
	
	// module
	exports.push([module.id, ".c-card {\n  width: 130px;\n  height: 200px;\n  border: 1px solid black;\n  border-radius: 5px;\n  cursor: pointer; }\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=bundle.js.map