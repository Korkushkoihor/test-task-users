import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  readonly #showSuccessTooltip = signal<string | null>(null);
  readonly successTooltipStatus = computed(this.#showSuccessTooltip);

  readonly #showWarningTooltip = signal<string | null>(null);
  readonly warningTooltipStatus = computed(this.#showWarningTooltip);

  public showSuccessMessage(message: string) {
    this.#showSuccessTooltip.set(message);
    setTimeout(()=> {this.#showSuccessTooltip.set(null)}, 5000);
  }

  public showWarningMessage(message: string) {
    this.#showWarningTooltip.set(message);
    setTimeout(()=> {this.#showWarningTooltip.set(null)}, 5000);
  }
}
