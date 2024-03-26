import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../interfaces/produto.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    TableComponent,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    ProdutoService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  onAdd(){
    this.router.navigate(["new"], { relativeTo: this.route});
  }
}
