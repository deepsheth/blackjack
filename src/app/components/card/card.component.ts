import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() props: Card;

  suit: string;
  value: number;
  faceDown = true;
  imageUrl: string;
  
  constructor() { }

  ngOnInit() {
    if (this.props) {
      this.suit = this.props.suit;
      this.value = this.props.value;
      this.faceDown = this.props.faceDown;
      this.imageUrl = this.props.image;
    }
  }

  toggleCardDirection() {
    this.faceDown = !this.faceDown;
  }

}
