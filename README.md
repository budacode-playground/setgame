# Set Game
Set is a popular logical board game. Now, implemented in Angular 2

### Card properties
We have a formation (or more) on each card.
We have 4 different property categories of the formations for each card:
 - Number, properties: 1, 2, 3
 - Saturation, properties: outlined, dashed, saturated
 - Color, properties: red, green, blue
 - Shape, properties: circle, square, rectangle

### Definition of a set
A set consists of 3 cards. These 3 cards has to have the same (or 3 different) properties in each property categories.

**Example 1**:
 - card 1: [1, red, outlined, circle]
 - card 2: [2, red, dashed, circle]
 - card 3: [3, red, saturated, circle]

**Example 2**:
 - card 1: [2, red, dashed, circle]
 - card 2: [2, green, dashed, square]
 - card 3: [2, blue, dashed, rectangle]

### Objects
  - Card object (has 4 properties in different categories)

 ```javascript
  {
   number: {1,2,3},
   saturation: {outlined, dashed, saturated},
   shape: {circle, square, rectangle},
   color: {red, green, blue},
 }
 ```

  - Deck object (81 cards)
  - Board object (Can draw cards from deck, etc.)
