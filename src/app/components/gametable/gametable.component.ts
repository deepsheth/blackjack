import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { DeckofcardsService } from "src/app/services/deckofcards.service";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { HandComponent } from "../hand/hand.component";
import { LocalStorageService } from "ngx-localstorage";
import { confetti } from "dom-confetti";

@Component({
  selector: "app-gametable",
  templateUrl: "./gametable.component.html",
  styleUrls: ["./gametable.component.scss"]
})
export class GametableComponent implements OnInit {
  token: string;
  onGameReady: Observable<boolean>;
  gameReady = false;
  winner = null;
  winnerMsg = null;

  @ViewChild("playerHand") playerHand: HandComponent;
  @ViewChild("dealerHand") dealerHand: HandComponent;
  @ViewChild("confettiOrigin", { read: ElementRef }) confettiOrigin: ElementRef;

  confettiConfig = {
    angle: 90,
    spread: 210,
    startVelocity: 45,
    elementCount: 70,
    duration: 3500,
    colors: ["#000", "#f00"]
  };

  constructor(
    private cardService: DeckofcardsService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  getNewDeck() {
    this.cardService.getNewDeck().subscribe(deck => {
      this.token = deck.deck_id;
      this.storageService.set("token", deck.deck_id);
      this.gameReady = true;
      this.onGameReady = of(true);
    });
  }

  dealerDraws($event) {
    this.dealerHand.dealerDraws();
  }

  endGame(winner: string) {
    // From event emitter
    if (winner) {
      // console.log(winner, 'already won');
      this.winner = winner;
    }
    // Player has not busted -- hand sum is <= 21
    else {
      // Checks if dealer busts
      if (this.dealerHand.handSum > 21) {
        this.winner = "Player";
        // console.log('player wins');
      }
      // Both the dealer and player have cards <= 21
      else if (this.dealerHand.handSum > this.playerHand.handSum) {
        this.winner = "Dealer";
        // console.log('dealer wins');
      } else if (this.dealerHand.handSum == this.playerHand.handSum) {
        this.winner = "Push";
      } else {
        this.winner = "Player";
      }
    }

    this.winnerMsg = this.getWinnerMsg();
    if (this.winner != "Dealer") {
      confetti(this.confettiOrigin.nativeElement, this.confettiConfig);
    }
  }

  restart() {
    this.winner = null;
    this.winnerMsg = null;
    this.playerHand.reset();
    this.dealerHand.reset();
  }

  getWinnerMsg() {
    switch (this.winner) {
      case "Dealer":
        return "Dealer wins 😩";
      case "Player":
        return "You win!" + this.getWinFace();
      case "Push":
        return"Push. 😐";
      default:
        return null;
    }
  }

  getWinFace() {
    // Generate number between 0 - 5 (inclusive)
    const index = Math.round(Math.random() * 5);
    const emojis = ["🤩", "🤪", "🤑", "😉", "👌", "♠️"];
    return emojis[index];
  }
}
