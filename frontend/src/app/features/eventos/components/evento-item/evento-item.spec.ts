import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoItem } from './evento-item';

describe('EventoItem', () => {
  let component: EventoItem;
  let fixture: ComponentFixture<EventoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
