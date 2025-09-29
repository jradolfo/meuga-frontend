import { Categoria } from "./categoria";
import { Grupo } from "./grupo";
import { Moeda } from "./moeda";
import { TipoRecorrencia } from "./tipo_recorrencia";
import { Usuario } from "./usuario";

export interface Gasto {
  id: number;
  data: Date;
  nome: string;
  categoria: Categoria;
  tags: string[];
  valor: number;
  moeda: Moeda;
  parcelas?: number;
  parcelaAtual?: number;
  usuarioCriador: Usuario;
  tipoRecorrencia?: TipoRecorrencia;
  grupo?: Grupo;
}
