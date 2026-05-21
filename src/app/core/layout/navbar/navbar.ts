import {Component, computed, inject, signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { AppIcons } from '../../../shared/ui/icons';
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private readonly router = inject(Router);
  public searchQuery = signal('');

  protected readonly Icons = AppIcons;

  public isDarkTheme = signal(true);
  public isMobileMenuOpen = signal(false);

  protected readonly CurrentThemeIcon = computed(() =>
    this.isDarkTheme() ? this.Icons.Sun : this.Icons.Moon
  );

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

  public toggleMobileMenu(): void {

    this.isMobileMenuOpen.update(
      value => !value
    );
  }

  public closeMobileMenu(): void {

    this.isMobileMenuOpen.set(false);
  }

  public submitSearch(): void {

    const query =
      this.searchQuery()
        .trim();

    this.closeMobileMenu();

    this.router.navigate(
      ['/tools'],
      {
        queryParams: {
          search: query
        }
      }
    );
  }
}
