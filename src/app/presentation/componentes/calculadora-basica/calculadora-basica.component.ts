import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChildren
} from '@angular/core';

import {
  CalculadoraBasicaService
} from '@/core/application/services/calculadora-basica.service';

import {
  BotonCalculadoraComponent
} from '../boton-calculadora/boton-calculadora.component';

@Component({
  selector: 'calculadora-basica',
  standalone: true,
  imports: [BotonCalculadoraComponent],
  templateUrl: './calculadora-basica.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'onKeyboardPress($event)'
  }
})
export class CalculadoraBasicaComponent {
  /*
    SERVICIOS
  */
  private readonly calculadora = inject(CalculadoraBasicaService);

  /*
    OBJETOS
  */
  /*
   LISTA DE BOTONES DE LA CALCULADORA
  */
  botonesArr = viewChildren(BotonCalculadoraComponent);

  /*
    READONLY SIGNAL
  */
  estado = computed(() => this.calculadora.estado());

  /*
    METODOS
  */
  onButtonClick(valor: string) {
    this.calculadora.procesar(valor);
  }

  /**
   *  FIRST USER INPUT CHANNEL
   */
  onKeyboardPress(evt: KeyboardEvent) {
    const keySanitizerRecord: Record<string, string> = {
      'Escape': 'c',
      'Clear': 'c',
      'Delete': 'c'
    };

    const operationKeySanititerRecord: Record<string, string> = {
      '*': 'x',
      '/': '÷',
      '.': ',',
      'Enter': '='
    };

    const key = keySanitizerRecord[evt.key] || operationKeySanititerRecord[evt.key] || evt.key;
    
    this.onButtonClick(key);

    this.botonesArr().forEach(btn => {
      btn.onKeyPressed(key);
    });
  }
}
