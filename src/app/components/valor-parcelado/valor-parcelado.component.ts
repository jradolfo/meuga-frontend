import { Component, model } from '@angular/core';
import { SwitchInput } from "../switch-input/switch-input";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-valor-parcelado',
  standalone: true,
  imports: [SwitchInput, FormsModule],
  templateUrl: './valor-parcelado.component.html',
  styleUrl: './valor-parcelado.component.css'
})
export class ValorParceladoComponent {

  parcelado = model(true);
  numeroParcelas = model(1);
  valorParcela = model(0);

}
