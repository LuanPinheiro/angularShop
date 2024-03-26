import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'produtos' },
    {
      path: 'produtos',
      loadChildren: () => import('./routes/produto.routes').then(m => m.PRODUTO_ROUTES)
    }
];
