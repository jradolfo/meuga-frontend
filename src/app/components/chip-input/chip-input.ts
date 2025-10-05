import { Component, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-chip-input',  
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chip-input.html',
  styleUrl: './chip-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInput),
      multi: true,
    },
  ],
})
export class ChipInput implements ControlValueAccessor {
  @Input() label = 'Label';
  @Input() placeholder = 'Adicionar...';
  @Input() maxChips?: number;
  @Input() removable = true;
  @Input() addOnPaste = true;

  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  chips: string[] = [];
  disabled = false;

  private onChange: (value: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string[] | null): void {
    this.chips = Array.isArray(value) ? value.slice() : [];
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addFromInput(value: string | null) {
    if (!value) return;
    const parts = value
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p);
    for (const p of parts) {
      if (this.maxChips && this.chips.length >= this.maxChips) break;
      if (!this.chips.includes(p)) this.chips.push(p);
    }
    this.emitChange();
    this.inputRef.nativeElement.value = '';
  }

  remove(index: number) {
    if (!this.removable || this.disabled) return;
    this.chips.splice(index, 1);
    this.emitChange();
  }

  emitChange() {
    this.onChange(this.chips.slice());
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (!this.addOnPaste) return;
    const text = event.clipboardData?.getData('text') || '';
    if (text) {
      event.preventDefault();
      this.addFromInput(text);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const input = this.inputRef.nativeElement;
    const value = input.value.trim();

    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      if (value) this.addFromInput(value);
    } else if (event.key === 'Backspace' && !value && this.chips.length) {
      // remove last chip
      this.chips.pop();
      this.emitChange();
    }
  }

  focusInput() {
    this.inputRef.nativeElement.focus();
    this.onTouched();
  }
}
