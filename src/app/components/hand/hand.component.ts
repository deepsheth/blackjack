import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Card } from "src/app/models/Card";
import { DeckofcardsService } from "src/app/services/deckofcards.service";
import { LocalStorageService } from "ngx-localstorage";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { callbackify } from "util";

@Component({
  selector: "app-hand",
  templateUrl: "./hand.component.html",
  styleUrls: ["./hand.component.scss"]
})
export class HandComponent implements OnInit {
  @Input() name = null;
  @Output() playerFinished = new EventEmitter();
  @Output() endGame = new EventEmitter();
  @Output() restart = new EventEmitter();

  cards: Card[] = [];
  handSum = 0;
  standing = false;

  constructor(private cardService: DeckofcardsService) {}

  ngOnInit() {
    this.initDealerHands();
  }

  getHandSum() {
    return (this.handSum = this.cards.reduce((acc, card): number => {
      let value = card.value;
      if (card.faceDown) {
        return acc;
      }
      if (isNaN(value)) {
        return acc + 10;
      } else {
        return acc + +value;
      }
    }, 0));
  }

  // Only draws one card at a time
  drawNewCard(faceDown = false) {
    const $drawNewCard = this.cardService.drawCard().pipe(
      tap(card => {
        if (this.cards.length <= 2) {
          card.cards[0].faceDown = faceDown;
        }
        this.cards = this.cards.concat(card.cards);
        this.getHandSum();

        // Busted!
        if (this.name !== "Dealer" && this.handSum > 21) {
          this.endGame.emit("Dealer");
        } else if (this.name !== "Dealer" && this.handSum == 21) {
          this.endGame.emit(this.name);
        }
      })
    );
    return $drawNewCard;
  }

  dealerDraws() {
    // Check if the dealer's 2 initial cards are above 16
    this.makeAllCardsFaceUp();
    this.getHandSum();

    if (this.name === "Dealer") {
      if (this.handSum <= 16) {
        this.drawNewCard().subscribe(() => {
          if (this.handSum > 16) {
            this.endGame.emit();
          } else {
            this.drawNewCard().subscribe(() => {
              if (this.handSum > 16) {
                this.endGame.emit();
              } else {
                this.drawNewCard().subscribe(() => {
                  if (this.handSum > 16) {
                    this.endGame.emit();
                  }
                  // else too many cards to draw
                });
              }
            });
          }
        });
      } else {
        this.endGame.emit();
        // console.log("already above 16");
      }
    }
  }

  makeAllCardsFaceUp() {
    return this.cards.forEach(card => {
      card.faceDown = false;
    });
  }

  stand() {
    this.playerFinished.emit("");
    this.standing = true;
  }

  initDealerHands() {
    if (this.name == "Dealer") {
      this.drawNewCard(true).subscribe();
      this.drawNewCard().subscribe();
    }
  }

  public trackCardFace(index: number, item: Card) {
    return item ? item.faceDown : undefined;
  }

  reset() {
    this.cards = [];
    this.handSum = 0;
    this.standing = false;
    this.initDealerHands();
  }
}
