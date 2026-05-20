import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Shell } from './core/layout/shell/shell';
import { By } from '@angular/platform-browser';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render shell component', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const shell = fixture.debugElement.query(By.directive(Shell));
    expect(shell).toBeTruthy();
  });
});
