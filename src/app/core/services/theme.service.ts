import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { StorageEnum } from '../../shared/enums/storage.enum';
import { StorageService } from './storage.service';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageService = inject(StorageService);

  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  private userPreference = signal<ThemeMode>(
    this.storageService.getItem<ThemeMode>(StorageEnum.THEME) ?? 'system',
  );

  private systemPrefersDark = signal(this.mediaQuery.matches);

  readonly theme = computed<'dark' | 'light'>(() => {
    if (this.userPreference() === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return this.userPreference() as 'dark' | 'light';
  });

  constructor() {
    this.mediaQuery.addEventListener('change', (e) =>
      this.systemPrefersDark.set(e.matches),
    );

    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private setTheme(mode: ThemeMode): void {
    this.userPreference.set(mode);
    this.storageService.setItem(StorageEnum.THEME, mode);
  }

  private applyTheme(theme: ThemeMode) {
    const root = document.documentElement;

    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);
  }
}
