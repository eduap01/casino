import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubItem } from './club-item';

describe('ClubItem', () => {
  let component: ClubItem;
  let fixture: ComponentFixture<ClubItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
