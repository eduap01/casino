import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandisingItem } from './merchandising-item';

describe('MerchandisingItem', () => {
  let component: MerchandisingItem;
  let fixture: ComponentFixture<MerchandisingItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchandisingItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchandisingItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
