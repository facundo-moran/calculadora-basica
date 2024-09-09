import { Routes } from '@angular/router';

import { CalculadoraBasicaVista } from './presentation/vistas/calculadoraBasica/calculadoraBasica.vista';

export const routes: Routes = [
  {
    path: 'calculadora',
    loadComponent: () => CalculadoraBasicaVista,
  },
  {
    path: '**',
    redirectTo: 'calculadora'
  }
];
