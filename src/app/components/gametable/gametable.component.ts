import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { DeckofcardsService } from 'src/app/services/deckofcards.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HandComponent } from '../hand/hand.component';
import { LocalStorageService } from 'ngx-localstorage';


@Component({
  selector: 'app-gametable',
  templateUrl: './gametable.component.html',
  styleUrls: ['./gametable.component.scss']
})
export class GametableComponent implements OnInit {

  token: string;
  onGameReady: Observable<boolean>;
  gameReady = false;
  winner = null;
  displayWinner = false;

  cards = <any>[];
  @ViewChild('playerHand') playerHand: HandComponent;
  @ViewChild('dealerHand') dealerHand: HandComponent;

  constructor(
    private cardService: DeckofcardsService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit() {
  }

  getNewDeck() {
    this.cardService.getNewDeck().subscribe(deck => {
      this.token = deck.deck_id;
      console.log("Game ready");
      this.storageService.set('token', deck.deck_id);
      this.gameReady = true;
      this.onGameReady = of(true);
    })  
  }

  dealerDraws($event) {
    this.dealerHand.drawNewCard();
    // console.log('deler drawing...');
    // while(this.dealerHand.handSum <= 16) {
    //   this.dealerHand.drawNewCard();

    //   console.log(this.dealerHand.handSum);
    // }
    // this.endGame(null);
  }

  endGame(winner: string) {
    
    // From event emitter
    if (winner) {
      this.winner = winner;
    }
    // Player has not busted -- hand sum is <= 21
    else {

      // Checks if dealer busts
      if (this.dealerHand.handSum > 21) {
        this.winner = this.playerHand.name;
      }
      // Both the dealer and player have cards <= 21
      else if (this.dealerHand.handSum > this.playerHand.handSum) {
        this.winner = this.dealerHand.name;
      }
      else {
        this.winner = this.playerHand.name;
      }
    }

    this.displayWinner = true;
    // this.gameReady = false;
  }

}
