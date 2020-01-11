import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsByGroupComponent } from './items-by-group.component';

describe('ItemsByGroupComponent', () => {
  let component: ItemsByGroupComponent;
  let fixture: ComponentFixture<ItemsByGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsByGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
