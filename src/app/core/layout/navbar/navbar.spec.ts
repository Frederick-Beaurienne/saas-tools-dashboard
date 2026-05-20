import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Navbar} from './navbar';
import {provideRouter} from '@angular/router';

describe('Navbar', () => {

  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let compiled: HTMLElement;

  beforeEach(async () => {

    document.body.className = 'dark';

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);

    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();

    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render brand title', () => {

    const title = compiled.querySelector(
      '.navbar__title'
    );

    expect(title?.textContent)
      .toContain('TechCorp');
  });

  it('should render navigation links', () => {

    const links = Array.from(
      compiled.querySelectorAll('.navbar__nav a')
    );

    const labels = links.map(
      link => link.textContent?.trim()
    );

    expect(labels).toContain('Dashboard');
    expect(labels).toContain('Tools');
    expect(labels).toContain('Analytics');
    expect(labels).toContain('Settings');
  });

  it('should render theme toggle button', () => {

    const button = compiled.querySelector(
      '.icon-btn--theme'
    );

    expect(button).toBeTruthy();
  });

  it('should switch to light theme', () => {

    component.toggleTheme();

    expect(document.body.classList.contains('light'))
      .toBe(true);

    expect(document.body.classList.contains('dark'))
      .toBe(false);
  });

  it('should switch back to dark theme', () => {

    component.toggleTheme();
    component.toggleTheme();

    expect(document.body.classList.contains('dark'))
      .toBe(true);

    expect(document.body.classList.contains('light'))
      .toBe(false);
  });

  it('should render disabled placeholder actions', () => {

    const disabledButtons = compiled.querySelectorAll(
      'button[disabled]'
    );

    expect(disabledButtons.length)
      .toBe(2);
  });
});
