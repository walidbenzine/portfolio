import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly loaderCounts = signal(0);
  readonly isLoading = computed(() => this.loaderCounts() > 0);

  show(): void {
    this.loaderCounts.update((count) => count + 1);
  }

  hide(): void {
    if (this.loaderCounts() > 0) {
      this.loaderCounts.update((count) => count - 1);
    }
  }
}
