import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalaysiaComponent } from './malaysia.component';

describe('MalaysiaComponent', () => {
  let component: MalaysiaComponent;
  let fixture: ComponentFixture<MalaysiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalaysiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalaysiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
