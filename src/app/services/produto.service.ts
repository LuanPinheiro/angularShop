import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProdutoPage} from '../interfaces/produtoPage.interface';
import { Produto } from '../interfaces/produto.interface';
import axios from "./axios";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private endpointUrl = "/produtos"
  

  constructor(){}

  getProdutos(): Promise<Produto[]>{
    return axios.get<ProdutoPage>(this.endpointUrl).then((response)=> {
      return response.data.content.map((produto: { nome: any; estoque: any; disponivel: any; }) => <Produto> {
        nome: produto.nome,
        estoque: produto.estoque,
        disponivel: produto.disponivel
      });
    });
  }

  postProduto(produto: Produto){
    return axios.post(this.endpointUrl, produto);
  }
}
