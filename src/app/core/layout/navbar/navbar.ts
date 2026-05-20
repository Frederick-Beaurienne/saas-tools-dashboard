import {Component} from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import {computed, signal} from '@angular/core';
import {AppIcons} from '../../../shared/ui/icons';
import {
  LucideAngularModule
} from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly Icons = AppIcons;

  protected readonly CurrentThemeIcon = computed(() =>
    this.isDarkTheme() ? this.Icons.Sun : this.Icons.Moon
  );

  public isDarkTheme = signal(true);

  public toggleTheme(): void {

    this.isDarkTheme.update(value => !value);

    document.body.classList.toggle(
      'dark',
      this.isDarkTheme()
    );

    document.body.classList.toggle(
      'light',
      !this.isDarkTheme()
    );
  }
}
