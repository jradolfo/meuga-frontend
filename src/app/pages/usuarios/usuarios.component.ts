import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', avatar: 'https://i.pravatar.cc/150?img=1', senha: '123456' },
    { id: 2, nome: 'Maria Souza', email: 'maria@email.com', avatar: 'https://i.pravatar.cc/150?img=2', senha: 'abcdef' }
  ];

  usuarioSelecionado: Usuario | null = null;
  novoUsuario: Usuario = { id: 0, nome: '', email: '', avatar: '', senha: '' };

  selecionarUsuario(usuario: Usuario) {
    this.usuarioSelecionado = { ...usuario };
  }

  salvarUsuario() {
    if (this.usuarioSelecionado) {
      const idx = this.usuarios.findIndex(u => u.id === this.usuarioSelecionado!.id);
      if (idx > -1) {
        this.usuarios[idx] = { ...this.usuarioSelecionado };
      }
    } else {
      const novoId = Math.max(...this.usuarios.map(u => u.id), 0) + 1;
      this.novoUsuario.id = novoId;
      this.usuarios.push({ ...this.novoUsuario });
      this.novoUsuario = { id: 0, nome: '', email: '', avatar: '', senha: '' };
    }
    this.usuarioSelecionado = null;
  }

  editarUsuario(usuario: Usuario) {
    this.selecionarUsuario(usuario);
  }

  excluirUsuario(usuario: Usuario) {
    this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
    if (this.usuarioSelecionado?.id === usuario.id) {
      this.usuarioSelecionado = null;
    }
  }

  cancelarEdicao() {
    this.usuarioSelecionado = null;
  }
}
