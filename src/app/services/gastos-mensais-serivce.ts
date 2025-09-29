import { Injectable } from "@angular/core";
import { Gasto } from "../models/gasto";
import { TipoRecorrencia } from "../models/tipo_recorrencia";


// Exemplo de usuário
const usuarioExemplo = {
  id: 3,
  nome: 'Carlos Silva',
  email: 'carlos@email.com',
  avatar: 'avatar3.png',
  senha: 'senha123'
};


const GASTOS: Gasto[] = [
 {
    id: 1,
    data: new Date('2025-09-01'),
    nome: 'Supermercado',
    categoria: { id: 2, nome: 'Alimentação', descricao: 'Compras de mercado' },
    tags: ['mercado', 'essencial'],
    valor: 150.75,
    moeda: { id: 1, nome: 'Real', simbolo: 'R$' },
    usuarioCriador: usuarioExemplo,
  },
  {
    id: 2,
    data: new Date('2025-09-10'),
    nome: 'Internet',
    categoria: { id: 3, nome: 'Serviços', descricao: 'Internet banda larga' },
    tags: ['internet', 'serviço'],
    valor: 99.90,
    moeda: { id: 1, nome: 'Real', simbolo: 'R$' },
    tipoRecorrencia: TipoRecorrencia.MENSAL,
    usuarioCriador: usuarioExemplo,
  },
  {
    id: 3,
    data: new Date('2025-09-15'),
    nome: 'Academia',
    categoria: { id: 4, nome: 'Saúde', descricao: 'Mensalidade da academia' },
    tags: ['academia', 'saúde'],
    valor: 120.00,
    moeda: { id: 1, nome: 'Real', simbolo: 'R$' },
    tipoRecorrencia: TipoRecorrencia.MENSAL,
    usuarioCriador: usuarioExemplo, 
  },
  {
    id: 4,
    data: new Date('2025-09-20'),
    nome: 'Transporte',
    categoria: { id: 5, nome: 'Transporte', descricao: 'Despesas com transporte' },
    tags: ['transporte', 'mobilidade'],
    valor: 80.00,
    moeda: { id: 1, nome: 'Real', simbolo: 'R$' },
    tipoRecorrencia: TipoRecorrencia.MENSAL,
    usuarioCriador: usuarioExemplo,
  },
  {
    id: 5,
    data: new Date('2025-09-25'),
    nome: 'Td-27',
    categoria: { id: 6, nome: 'Hobby', descricao: 'Gastos com hobbies' },
    tags: ['bateria', 'musica'],
    valor: 9000.00,
    parcelaAtual: 2,
    parcelas: 10,
    moeda: { id: 1, nome: 'Real', simbolo: 'R$' },
    usuarioCriador: usuarioExemplo,
  },
  {
    id: 6,  
    data: new Date('2025-09-28'),
    nome: 'Netflix',
    categoria: { id: 7, nome: 'Serviços', descricao: 'Serviços' },
    tags: ['online', 'streaming'],
    valor: 45.00,
    moeda: { id: 1, nome: 'Real', simbolo: 'R$' },
    tipoRecorrencia: TipoRecorrencia.MENSAL,
    usuarioCriador: usuarioExemplo,
  },
  {
    id: 6,  
    data: new Date('2025-09-28'),
    nome: 'Google One',
    categoria: { id: 7, nome: 'Serviços', descricao: 'Serviços' },
    tags: ['online', 'storage'],
    valor: 199.00,
    moeda: { id: 1, nome: 'Real', simbolo: 'R$' },
    tipoRecorrencia: TipoRecorrencia.ANUAL,
    usuarioCriador: usuarioExemplo,
  },
  {
    id: 7,  
    data: new Date('2025-09-30'),
    nome: 'Cinema',
    categoria: { id: 8, nome: 'Viagem', descricao: 'Gastos com viagens' },
    tags: ['filme', 'diversão'],
    valor: 60.00,
    moeda: { id: 2, nome: 'Euro', simbolo: '€'},
    usuarioCriador: usuarioExemplo,
    grupo: { id: 1, 
          nome: 'Viagem França', 
          descricao: 'Grupo de gastos com a viagem para França Novembro', 
          icone: 'group_icon.png', 
          usuarioCriador: usuarioExemplo,
          moedaPadrao: { id: 2, nome: 'Euro', simbolo: '€'},
          usuarios: [usuarioExemplo]
        }
  }
];
   


@Injectable({ providedIn: 'root' })
export class GastoService {
  //private apiUrl = environment.apiUrl + '/users';

  //constructor(private http: HttpClient) {}

  getAll(): Gasto[] {
    return GASTOS;
  }

//   getById(id: number): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/${id}`);
//   }

//   create(user: User): Observable<User> {
//     return this.http.post<User>(this.apiUrl, user);
//   }
}
