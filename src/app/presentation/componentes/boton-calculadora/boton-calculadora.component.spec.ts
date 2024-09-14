import {
  ComponentFixture,
  TestBed
} from "@angular/core/testing";

import {
  BotonCalculadoraComponent
} from "./boton-calculadora.component";
import { Component } from "@angular/core";


/*
  COMPONENTE DE PRUEBA PARA EL CONTENIDO RENDERIZADO
*/
@Component({
  standalone: true,
  imports: [
    BotonCalculadoraComponent
  ],
  template: `
    <boton-calculadora>
      <span class="projected-content">content</span>
    </boton-calculadora>
  `
})
class ProjectedContentComponent {}

describe('BotonCalculadoraComponent', () => {
  let fixture: ComponentFixture<BotonCalculadoraComponent>;
  let compiled: HTMLElement;
  let component: BotonCalculadoraComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonCalculadoraComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BotonCalculadoraComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    /*
      Para que el componente se termine de configurar al crearse
    */
    fixture.detectChanges();
  });

  it('should be created', () => {
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 class if esBotonDoble flag is false', () => {
    /*
      CONSULTA DE CLASES 2
    */
    const hostClasses: string[] = compiled.classList.value.split(' ');
    const claseEsperada: string = 'w-1/4';

    expect(hostClasses).toContain(claseEsperada);
    expect(component.esBotonDoble()).toBe(false);
  });

  it('should apply w-2/4 class if esBotonDoble flag is true', () => {
    /*
      ENVIAR UN VALOR A EL INPUT esBotonDoble
    */
    fixture.componentRef.setInput('esBotonDoble', true);
    fixture.detectChanges();

    /*
      CONSULTA DE CLASES 2
    */
    const hostClasses: string[] = compiled.classList.value.split(' ');
    const claseEsperada: string = 'w-2/4';

    expect(hostClasses).toContain(claseEsperada);
    expect(component.esBotonDoble()).toBe(true);
  });

  it("should emit content when clicked", () => {
    /*
      *   PREPARACION
    */
    const argumentToEmit: string = '';
    /*
    ESPIAR EL EMISOR DE CONTENIDO
    */
    spyOn(component.contenidoEmitter, 'emit')
    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    component.emitirContenido();
    /*
      *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(component.contenidoEmitter.emit).toHaveBeenCalledWith(argumentToEmit);
  });

  it('should toggle value of teclaPresionada when key pressed matches content', (done) => {
    const keyPressed: string = '1';
    const content: string = keyPressed;

    component.valorProyectado().nativeElement.innerText = content;
    component.onKeyPressed(keyPressed);

    expect(component.teclaPresionada()).toBeTrue();

    setTimeout(() => {
      expect(component.teclaPresionada()).toBeFalse();
      /*
        DONE FUNCTION PARA ESPERAR LLAMADAS ASINCRONAS
      */
      done();
    }, 150);
  });

  it('should not toggle value of teclaPresionada when key pressed does not match content', () => {
    const keyPressed: string = '1';
    const content: string = keyPressed + 1;

    component.valorProyectado().nativeElement.innerText = content;
    component.onKeyPressed(keyPressed);

    expect(component.teclaPresionada()).toBeFalse();
  });

  it('should render projected content', () => {
    const fixture = TestBed.createComponent(ProjectedContentComponent);
    const compiled = fixture.nativeElement as HTMLDivElement;

    expect(compiled.querySelector('span.projected-content')).not.toBeNull();
  });

});
