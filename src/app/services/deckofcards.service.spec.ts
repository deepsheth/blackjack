import { TestBed } from '@angular/core/testing';

import { DeckofcardsService } from './deckofcards.service';

describe('DeckofcardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckofcardsService = TestBed.get(DeckofcardsService);
    expect(service).toBeTruthy();
  });
});
