import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlayerComponent } from './delete-player.component';

describe('DeletePlayerComponent', () => {
  let component: DeletePlayerComponent;
  let fixture: ComponentFixture<DeletePlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePlayerComponent]
    });
    fixture = TestBed.createComponent(DeletePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
