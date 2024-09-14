import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';

@Component({
  selector: 'boton-calculadora',
  standalone: true,
  templateUrl: './boton-calculadora.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .es-btn-operacion {
      @apply bg-green-800 bg-opacity-20;
    }

    .es-tecla-presionada {
      @apply bg-green-100 bg-opacity-20;
    }
  `,
  host: {
    '[class.w-1/4]': '!esBotonDoble()',
    '[class.w-2/4]': 'esBotonDoble()'
  }
})
export class BotonCalculadoraComponent {
  esBotonOperacion = input(false, {
    /*
      TRANSFORMA EL VALOR ANTES DEL ON INIT
    */
    transform: (val: boolean | string) => {
      return (typeof val === 'string' ? (val === '') : val);
    }
  });

  esBotonDoble = input(false, {
    /*
      TRANSFORMA EL VALOR ANTES DEL ON INIT
    */
    transform: (val: boolean | string) => {
      return (typeof val === 'string' ? (val === '') : val);
    }
  });

  /*
    VALUE EMITTER

    para emitir el valor del contenido proyectado
  */
  contenidoEmitter = output<string>();

  valorProyectado = viewChild.required<ElementRef<HTMLButtonElement>>('btn');

  teclaPresionada = signal(false);

  emitirContenido() {
    const existeValorProyectado = this.valorProyectado() && this.valorProyectado()?.nativeElement;

    if (existeValorProyectado) {
      this.teclaPresionada.set(true);
      
      setTimeout(() => {
        this.teclaPresionada.set(false);
      }, 100)

      const contenido = this.valorProyectado()!.nativeElement.innerText;
      this.contenidoEmitter.emit(contenido.trim().toLowerCase());
    }
  }

  onKeyPressed(key: string) {
    const existeValorProyectado = this.valorProyectado() && this.valorProyectado()?.nativeElement;
    if (existeValorProyectado) {
      const contenido = this.valorProyectado()!.nativeElement.innerText;

      if (key === contenido) {
        this.teclaPresionada.set(true);

        setTimeout(() => {
          this.teclaPresionada.set(false);
        }, 100)
      }
    }
  }

  /*
    @HostBinding ACCESO A PROPIEDADES Y ATRIBUTOS DEL HOST
  */

  /*
    Clase aplicada solo a botones de operacion
  */
  // @HostBinding('class.es-btn-operacion')
  // get backgroundIndigo700() {
  //   return this.esBotonOperacion();
  // }

  // @HostBinding('class.w-2/4')
  // get mitadDelAncho() {
  //   return this.esBotonDoble();
  // }
}
