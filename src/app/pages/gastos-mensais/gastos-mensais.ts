import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, computed, inject, linkedSignal, model, signal, TemplateRef, WritableSignal } from '@angular/core';
import { Gasto } from '../../models/gasto';
import { GastoService } from '../../services/gastos-mensais-serivce';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChipInput } from "../../components/chip-input/chip-input";
import { CurrencyInput } from "../../components/currency-input/currency-input";
import { SwitchInput } from "../../components/switch-input/switch-input";
import { NovoGasto } from '../../models/novo_gasto';
import { ValorParceladoComponent } from "../../components/valor-parcelado/valor-parcelado.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoedaValorComponent } from "../../components/moeda-valor/moeda-valor.component";
import { Moeda, TipoMoeda } from '../../models/moeda';

type ParceladoRecorrente = 'nao_aplica' | 'parcelado' | 'recorrente';

@Component({
  selector: 'app-gastos-mensais',
  standalone: true,
  imports: [CommonModule, ChipInput, CurrencyInput, ValorParceladoComponent, ReactiveFormsModule, FormsModule, MoedaValorComponent],
  templateUrl: './gastos-mensais.html',
  styleUrl: './gastos-mensais.css'
})
export class GastosMensais {
  
  constructor(private gastoService: GastoService, private modalService: NgbModal) {}
  
  gastos: Gasto[] = [];
  totalGastos: number = 0;
  closeResult: WritableSignal<string> = signal('');
  
  gastoForm = new FormGroup({
    grupo: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    moeda: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    parceladoRecorrente: new FormControl(0, Validators.required),    
  });

  moeda = model<TipoMoeda>('BRL');
  valor = model(0);
  parceladoRecorrente = model<ParceladoRecorrente>('nao_aplica');
  numeroParcelas = model(2);
  
  valorParcela = linkedSignal(() => {
    if (this.parceladoRecorrente() === 'parcelado' && this.numeroParcelas() > 1 && this.valor() > 0) {
      const valorParcela = this.valor() / this.numeroParcelas();
      return valorParcela.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return this.valor();
  });



  showRecorrente = computed(() => {    
    return this.parceladoRecorrente() === 'recorrente';
  });

  showParcelado = computed(() => {
    return this.parceladoRecorrente() === 'parcelado';
  });

  async ngOnInit() {
    this.gastos = await this.gastoService.getAll();
    this.totalGastos = this.calcularTotal();
  }
  
	open(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

  onSubmit(modal: any) {
    if (this.gastoForm.valid) {
      console.log('Dados:', this.gastoForm.value);
      modal.close(); // fecha o modal
      this.gastoForm.reset(); // limpa o form
    }
  }

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  formatarParcelas(gasto: Gasto): string {
    if (gasto.parcelas && gasto.parcelaAtual) {
      return `${gasto.parcelaAtual} de ${gasto.parcelas}`;
    }
    return '--';
  }

  calcularTotal(): number {
    return this.gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
  }
}
