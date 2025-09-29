import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { Gasto } from '../../models/gasto';
import { GastoService } from '../../services/gastos-mensais-serivce';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChipInput } from "../../components/chip-input/chip-input";
import { CurrencyInput } from "../../components/currency-input/currency-input";
import { SwitchInput } from "../../components/switch-input/switch-input";
import { NovoGasto } from '../../models/novo_gasto';
import { 
  form, 
  required, 
  minLength, 
  validate, 
  submit,
  Control,
} from '@angular/forms/signals';


@Component({
  selector: 'app-gastos-mensais',
  standalone: true,
  imports: [CommonModule, ChipInput, CurrencyInput, SwitchInput],
  templateUrl: './gastos-mensais.html',
  styleUrl: './gastos-mensais.css'
})
export class GastosMensais {
  gastos: Gasto[] = [];
  totalGastos: number = 0;
  private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

  protected readonly novoGasto = signal<NovoGasto>({
    nome: '',
    valor: 0,
    categoria: undefined,
    tags: [],
    moeda: undefined
  });

  protected readonly talkProposalForm = form(this.novoGasto);

  constructor(private gastoService: GastoService) {}

  async ngOnInit() {
    this.gastos = await this.gastoService.getAll();
    this.totalGastos = this.calcularTotal();
  }
  
	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
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
