import { Categoria } from "./categoria";
import { Moeda } from "./moeda";
import { Usuario } from "./usuario";

export interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  icone: string;
  usuarioCriador: Usuario;
  moedaPadrao: Moeda;
  usuarios: Usuario[];
  categorias?: Categoria[];
}
