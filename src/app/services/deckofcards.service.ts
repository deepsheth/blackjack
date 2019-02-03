import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root'
})
export class DeckofcardsService {

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
    ) { }

  // todo: env variables
  // newDeckUrl = env.newDeckUrl;

  // todo: add models
  // todo: new deck if no more remaining cards
  
  getNewDeck(count=1) {
    const deck: Observable<any> =  this.http.get<any>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=' + count);
    deck.subscribe(deck => this.storageService.set('token', deck.deck_id));
    return deck;
  }

  drawCard(count=1) {
    return this.http.get<any>(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${count}`);
  }

  get deckId() {
    return this.storageService.get('token');
  }

}
