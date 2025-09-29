import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoItem } from './plato-item';

describe('PlatoItem', () => {
  let component: PlatoItem;
  let fixture: ComponentFixture<PlatoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatoItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
