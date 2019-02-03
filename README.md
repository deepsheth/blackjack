# Blackjack

This is a Blackjack web app with only cards &mdash; no gambling! Go ahead and [play the game](https://deepsheth.github.io/blackjack/).

## Screenshots
![Player Winning Screenshot](/src/assets/screenshot-celebration.png "Player Winning Screenshot")
![Player Busting Screenshot](/src/assets/screenshot-bust.png "Player Losing Screenshot")

## Gameplay
This game follows the standard rules of Blackjack. The one difference is that an Ace has a value of 10. Also, the more "advanced" Blackjack strategies such as splitting, doubling, etc. are not implemented since there is no betting or buying in.

## Dev Tools
I built this app as a weekend project with Angular and the [Deck of Cards API](https://deckofcardsapi.com/).

## Potential New Features & Dev Work
- Get a new shuffled deck once the current deck runs out. Currently, once all cards are exhausted, the web app must be refreshed to get a new deck from the API.
- Make the Ace worth either 11 or a 1
- Toggle a hint feature to show the [optimal strategy](https://www.blackjackapprenticeship.com/blackjack-strategy-charts/)
- Leverage the existing localStroage package to store the current hand state of a player
- Create Models for Cards, Hands, and Players
- Support multiple players against the dealer
- Add chips and betting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
