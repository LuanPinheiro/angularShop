import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProdutoPage} from '../interfaces/produtoPage.interface';
import { Produto } from '../interfaces/produto.interface';
import API from "./axios";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private endpointUrl = "/produtos"
  
  constructor(){}

  getProdutos(): Promise<Produto[]>{
    return API.get<ProdutoPage>(this.endpointUrl).then((response)=> {
      return response.data.content.map((produto: { id: any; nome: any; estoque: any; disponivel: any; }) => <Produto> {
        id: produto.id,
        nome: produto.nome,
        estoque: produto.estoque,
        disponivel: produto.disponivel
      });
    });
  }

  saveProduto(produto: Partial<Produto>){
    if(produto.id){
      return this.updateProduto(produto);
    }
    return this.createProduto(produto);
  }

  createProduto(produto: Partial<Produto>){
    return API.post(this.endpointUrl, produto);
  }

  updateProduto(produto: Partial<Produto>){
    return API.put(this.endpointUrl, produto, {params: {
      id: produto.id
    }});
  }

  deleteProduto(id: any) {
    return API.delete(this.endpointUrl, {params: { id }});
  }
}
