import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../interfaces/produto.interface';
import { Observable } from 'rxjs';
import { ProdutoPage } from '../../interfaces/produtoPage.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, AsyncPipe],
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

  constructor(private service: ProdutoService){
    this.refresh();
  }

  refresh(){
    this.loading.set(true)
    this.service.getProdutos().then((response) => {
      this.produtos = response
      this.loading.set(false)
    });
  }
}
