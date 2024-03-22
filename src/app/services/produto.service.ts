import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProdutoPage} from '../interfaces/produtoPage.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private endpointUrl = "http://localhost:8080/produtos"

  constructor(private client : HttpClient){}

  getProdutos(): Observable<ProdutoPage>{
    return this.client.get<ProdutoPage>(this.endpointUrl).pipe();
  }
}
