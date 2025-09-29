import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  imports: [],
  standalone: true,
  templateUrl: './currency-input.html',
  styleUrl: './currency-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInput),
      multi: true,
    },
  ],
})
export class CurrencyInput implements ControlValueAccessor {
  @Input() placeholder = '0,00';
  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  focused = false;
  disabled = false;

  private onChange: (value: { currency: string; amount: number | null }) => void = () => {};
  private onTouched: () => void = () => {};
  private currentValue: number | null = null;
  private debounceTimer: any;
  selectedCurrency: string = 'BRL';

  writeValue(obj: { currency: string; amount: number | null } | null): void {
    if (obj) {
      this.selectedCurrency = obj.currency;
      this.currentValue = obj.amount;
      this.inputRef.nativeElement.value = this.formatCurrency(this.currentValue);
    } else {
      this.inputRef.nativeElement.value = '';
    }
  }

  registerOnChange(fn: (value: { currency: string; amount: number | null }) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const raw = (event.target as HTMLInputElement).value.replace(/\D/g, ''); // só dígitos
      if (!raw) {
        this.currentValue = null;
        this.inputRef.nativeElement.value = '';
        this.emitChange();
        return;
      }

      // Monta número dividindo por 100 (duas casas decimais fixas)
      const numeric = parseFloat(raw) / 100;
      this.currentValue = numeric;

      // Formata em moeda
      this.inputRef.nativeElement.value = this.formatCurrency(numeric);
      this.emitChange();
    }, 100);
  }

  onCurrencyChange(event: Event) {
    this.selectedCurrency = (event.target as HTMLSelectElement).value;
    this.emitChange();
  }

  private emitChange() {
    this.onChange({ currency: this.selectedCurrency, amount: this.currentValue });
  }

  onBlur() {
    this.focused = false;
    this.onTouched();
    this.inputRef.nativeElement.value = this.formatCurrency(this.currentValue);
  }

  onFocus() {
    this.focused = true;
  }

  private parseCurrency(value: string): number | null {
    if (!value) return null;
    const cleaned = value.replace(/[^\d,]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  }

  private formatCurrency(value: number | null): string {
    if (value == null) return '';
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
