import { Component, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../interfaces/produto.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatSnackBarModule],
  providers: [
    ProdutoService
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  produtos: Produto[] = [];
  loading = signal(false)
  colunas: string[] = ["Nome", "Estoque", "Ações"]

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ){
    this.refresh();
  }

  refresh(){
    this.loading.set(true)
    this.service.getProdutos()
      .then((response) => {
        this.produtos = response
      })
      .catch(() => {
        alert("Erro ao listar os produtos");
      })
      .finally(() => this.loading.set(false));
  }

  onEdit(produto: Produto){
    this.router.navigate(["edit", produto], { relativeTo: this.route }).then(() => this.refresh())
  }

  onDelete(idProduto: string){
    this.service.deleteProduto(idProduto)
      .then(() => {
        this.snackbar.open("Produto removido com sucesso", "", { duration: 5000 });
        this.refresh();
      })
      .catch(() => this.snackbar.open("Erro ao remover produto", "", { duration: 5000 }));
  }
}
