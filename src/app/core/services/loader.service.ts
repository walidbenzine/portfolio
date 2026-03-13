import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly loaderCounts = signal(0);
  private readonly visible = signal(false);

  readonly isLoading = computed(() => this.visible());

  private readonly showDelay = 100;
  private readonly minDuration = 1000;

  private showTimeout?: any;
  private lastShowTime = 0;

  show(): void {
    const current = this.loaderCounts();
    this.loaderCounts.set(current + 1);

    if (current === 0) {
      clearTimeout(this.showTimeout);

      this.showTimeout = setTimeout(() => {
        this.visible.set(true);
        this.lastShowTime = Date.now();
      }, this.showDelay);
    }
  }

  hide(): void {
    if (this.loaderCounts() === 0) return;

    this.loaderCounts.update((c) => c - 1);

    if (this.loaderCounts() === 0) {
      clearTimeout(this.showTimeout);

      if (!this.visible()) {
        return;
      }

      const elapsed = Date.now() - this.lastShowTime;
      const remaining = this.minDuration - elapsed;

      const doHide = () => this.visible.set(false);

      if (remaining > 0) {
        setTimeout(doHide, remaining);
      } else {
        doHide();
      }
    }
  }
}
