import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProdutoService } from '../../services/produto.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  form: FormGroup;
  loading = signal(false);
  disponivel!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutoService,
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ){
    let produto: any;
    this.route.params.subscribe(
      (p) => produto = p
    );
    this.disponivel = produto.disponivel;
    this.form = this.formBuilder.group({
      id: new FormControl<string | null>(produto.id),
      nome: new FormControl<string | null>(produto.nome, Validators.required),
      estoque: new FormControl<Number | null>(produto.estoque, {nonNullable: true}),
      disponivel: new FormControl<boolean>(this.disponivel)
    })
  };

  onSubmit(){
    this.loading.set(true)
    console.log(this.disponivel)
    this.form.value.disponivel = this.disponivel;
    this.service.saveProduto(this.form.value).then(()=>{
      this.snackbar.open("Produto salvo!", "", { duration: 5000 })
      this.onCancel();  
    })
    .catch(() => {
      this.snackbar.open("Erro ao salvar produto", "", { duration: 5000 })
    })
    .finally(() => this.loading.set(false));
  }

  onCancel(){
    this.location.back();
  }

  setDisponivel(){
    console.log("VALOR ANTES: " + this.disponivel)
    this.disponivel = this.disponivel == false ? true : false
    console.log("Cheguei na função e disponivel é: " + this.disponivel);
  }
}
