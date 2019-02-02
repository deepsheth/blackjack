import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Card } from "src/app/models/Card";
import { DeckofcardsService } from "src/app/services/deckofcards.service";
import { LocalStorageService } from "ngx-localstorage";

@Component({
  selector: "app-hand",
  templateUrl: "./hand.component.html",
  styleUrls: ["./hand.component.scss"]
})
export class HandComponent implements OnInit {
  @Input() name = null;
  @Input() token: string;
  @Output() playerFinished = new EventEmitter();
  @Output() endGame = new EventEmitter();

  cards: Card[] = [];
  handSum = 0;

  constructor(private cardService: DeckofcardsService) {}

  ngOnInit() {}

  getHandSum() {
    this.handSum = this.cards.reduce((acc, card): number => {
      let value = card.value;
      if (isNaN(value)) {
        return acc + 10;
      } else {
        return acc + +value;
      }
    }, 0);
  }

  drawNewCard() {
    this.cardService.drawCard().subscribe(card => {
      this.cards = this.cards.concat(card.cards);
      this.getHandSum();

      if (this.name === "Dealer") {
        if (this.handSum <= 16) {
          this.drawNewCard();
        }
        else {
          this.endGame.emit();
        }
      }

      if (this.name !== "Dealer" && this.handSum > 21) {
        console.log("Dealer won!");
        this.endGame.emit("Dealer");
      }
    });
  }

  stand() {
    this.playerFinished.emit("");
  }
}
