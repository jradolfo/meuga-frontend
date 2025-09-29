import { Categoria } from "./categoria";
import { Grupo } from "./grupo";
import { Moeda } from "./moeda";
import { TipoRecorrencia } from "./tipo_recorrencia";
import { Usuario } from "./usuario";

export interface NovoGasto {
  nome: string;
  categoria?: Categoria;
  tags: string[];
  valor: number;
  moeda?: Moeda;
  parcelas?: number;
  parcelaAtual?: number;
  tipoRecorrencia?: TipoRecorrencia;
  grupo?: Grupo;
}
