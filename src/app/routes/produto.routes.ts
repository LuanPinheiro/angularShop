import { Routes } from '@angular/router';
import { FormComponent } from '../components/form/form.component';
import { HomeComponent } from '../components/home/home.component';



export const PRODUTO_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new', component: FormComponent},
    { path: 'edit', component: FormComponent}
];