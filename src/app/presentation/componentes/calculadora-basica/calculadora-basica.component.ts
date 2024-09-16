import {
  afterRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
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
    '(document:keyup)': 'onKeyboardPress($event)',
    '(document:load)': 'scrollTo()',
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

  onKeyboardPress(evt: KeyboardEvent) {
    const ClearKeyRecord: Record<string, string> = {
      'Escape': 'c',
      'Clear': 'c',
      'Delete': 'c'
    };

    const OperationKeyRecord: Record<string, string> = {
      '*': 'x',
      '/': '÷',
      '.': ',',
      'Enter': '='
    };

    const key = ClearKeyRecord[evt.key] || OperationKeyRecord[evt.key] || evt.key;

    this.onButtonClick(key);

    this.botonesArr().forEach(btn => {
      btn.onKeyPressed(key);
    });
  }
}
