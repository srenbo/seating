import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingViewerComponent } from './seating-viewer.component';

describe('SeatingViewerComponent', () => {
  let component: SeatingViewerComponent;
  let fixture: ComponentFixture<SeatingViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatingViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
