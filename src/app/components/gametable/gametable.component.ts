import { Component, OnInit, ViewChild, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { DeckofcardsService } from 'src/app/services/deckofcards.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HandComponent } from '../hand/hand.component';
import { LocalStorageService } from 'ngx-localstorage';
import { confetti } from 'dom-confetti';


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

  @ViewChild('playerHand') playerHand: HandComponent;
  @ViewChild('dealerHand') dealerHand: HandComponent;
  @ViewChild('confettiOrigin', {read: ElementRef}) confettiOrigin: ElementRef;

  confettiConfig = {
    angle:  90,
    spread: 210,
    startVelocity: 45,
    elementCount: 70,
    duration: 3500,
    colors: ["#000", "#f00"]
  };

  constructor(
    private cardService: DeckofcardsService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  getNewDeck() {
    this.cardService.getNewDeck().subscribe(deck => {
      
      this.token = deck.deck_id;
      this.storageService.set('token', deck.deck_id);
      this.gameReady = true;
      this.onGameReady = of(true);
    })  
  }

  dealerDraws($event) {
    this.dealerHand.dealerDraws();
  }

  endGame(winner: string) {
    console.log('Ending game');
    // From event emitter
    if (winner) {
      console.log(winner, 'already won');
      this.winner = winner;
    }
    // Player has not busted -- hand sum is <= 21
    else {

      // Checks if dealer busts
      if (this.dealerHand.handSum > 21) {
        this.winner = this.playerHand.name;
        console.log('player wins');
      }
      // Both the dealer and player have cards <= 21
      else if (this.dealerHand.handSum > this.playerHand.handSum) {
        this.winner = this.dealerHand.name;
        console.log('dealer wins');
      }
      else if (this.dealerHand.handSum == this.playerHand.handSum) {
        this.winner = 'Draw';
      }
      else {
        this.winner = this.playerHand.name;
        console.log('player wins');
      }
    }

    this.displayWinner = true;
    if (this.winner != 'Dealer') {
      confetti(this.confettiOrigin.nativeElement, this.confettiConfig);
    }
  }

  restart() {
    this.winner = null;
    this.displayWinner = false;
    this.playerHand.reset();
    this.dealerHand.reset();
  }
}
