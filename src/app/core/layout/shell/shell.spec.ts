import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {Shell} from './shell';
import {Navbar} from '../navbar/navbar';
import {Footer} from '../footer/footer';
import {RouterOutlet} from '@angular/router';

describe('Shell', () => {
  let component: Shell;
  let fixture: ComponentFixture<Shell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shell],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Shell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create shell', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar', () => {
    const navbar = fixture.debugElement.query(By.directive(Navbar));
    expect(navbar).toBeTruthy();
  });

  it('should render footer', () => {
    const footer = fixture.debugElement.query(By.directive(Footer));
    expect(footer).toBeTruthy();
  });

  it('should contain router outlet', () => {
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(outlet).toBeTruthy();
  });
});
