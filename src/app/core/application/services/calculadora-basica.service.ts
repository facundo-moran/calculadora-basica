import {
  computed,
  Injectable,
  signal
} from '@angular/core';

import {
  CalculadoraBasica
} from '@/core/domain/calculadora-basica';

export type CalculadoraEstadoBasico = {
  resultado: string;
  subResultado: string;
  ultimaOperacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalculadoraBasicaService {
  private calculadora = new CalculadoraBasica();

  /*
    ESTADO
  */
  estado = signal<CalculadoraEstadoBasico>({
    resultado: this.calculadora.resultado,
    subResultado: this.calculadora.subResultado,
    ultimaOperacion: this.calculadora.ultimaOperacion
  });

  /*
    METODOS PRIVADOS
  */
  private actualizarEstado() {
    this.estado.set({
      resultado: this.calculadora.resultado,
      subResultado: this.calculadora.subResultado,
      ultimaOperacion: this.calculadora.ultimaOperacion
    })
  }

  /*
    METODOS
  */
  procesar(valor: string): void {
    this.calculadora.procesar(valor);
    this.actualizarEstado();
  }
}
