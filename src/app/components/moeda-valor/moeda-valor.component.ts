import { Component, computed, linkedSignal, model } from '@angular/core';
import { TipoMoeda } from '../../models/moeda';



@Component({
  selector: 'app-moeda-valor',
  imports: [],
  templateUrl: './moeda-valor.component.html',
  styleUrl: './moeda-valor.component.css'
})
export class MoedaValorComponent {

  valor = model.required<number>();
  moeda = model<TipoMoeda>('BRL');

  valorFormatado = computed(() => {
    const val = this.valor();
    
    return val.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  onInput(event: Event) {
        
      const raw = (event.target as HTMLInputElement).value.replace(/\D/g, ''); // só dígitos
      if (!raw) {
        this.valor.set(0);
        return;
      }

      // Monta número dividindo por 100 (duas casas decimais fixas)
      const numeric = parseFloat(raw) / 100;
      this.valor.set(numeric);

  }
}
