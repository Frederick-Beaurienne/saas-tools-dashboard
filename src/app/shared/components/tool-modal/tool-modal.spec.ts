import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolModal } from './tool-modal';

describe('ToolModal', () => {
  let component: ToolModal;
  let fixture: ComponentFixture<ToolModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
