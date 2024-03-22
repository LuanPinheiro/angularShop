import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
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

  produtos$: Observable<ProdutoPage>;
  colunas: string[] = ["Nome", "Estoque", "Ações"]

  constructor(private service: ProdutoService){
    this.produtos$ = this.service.getProdutos();
  }

  refresh(){
    this.produtos$ = this.service.getProdutos();
  }
}
