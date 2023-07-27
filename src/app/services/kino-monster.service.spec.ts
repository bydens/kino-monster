import { TestBed } from '@angular/core/testing';

import { KinoMonsterService } from './kino-monster.service';

describe('KinoMonsterService', () => {
  let service: KinoMonsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KinoMonsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
