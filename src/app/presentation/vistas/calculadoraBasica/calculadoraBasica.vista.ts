import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  CalculadoraBasicaComponent
} from '@/presentation/componentes/calculadora-basica/calculadora-basica.component';

@Component({
  standalone: true,
  imports: [
    CalculadoraBasicaComponent
  ],
  templateUrl: './calculadoraBasica.vista.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .contenedor-calculadora {
      @apply font-sans;
    }
  `
})
export class CalculadoraBasicaVista { }
