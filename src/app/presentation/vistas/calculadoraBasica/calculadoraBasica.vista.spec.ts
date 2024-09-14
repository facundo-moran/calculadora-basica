
import {
  ComponentFixture,
  TestBed
} from "@angular/core/testing";

import {
  CalculadoraBasicaVista
} from "./calculadoraBasica.vista";

describe('CalculadoraBasicaVista', () => {
  let fixture: ComponentFixture<CalculadoraBasicaVista>;
  let compiled: HTMLElement;
  let component: CalculadoraBasicaVista;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraBasicaVista]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraBasicaVista);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should render calculadora component', () => {
    expect(compiled.querySelector('calculadora-basica')).not.toBeNull();
  });

  it('should contain basic css classes', () => {
    /*
      CONSULTA DE CLASES 1
    */
    const clasesContenedorDiv = compiled.querySelector('div')?.classList;
    const clasesBasicas = 'contenedor-calculadora bg-palo-alto p-4 rounded-lg shadow-lg max-w-xs mx-auto'.split(" ");

    expect(clasesContenedorDiv).not.toBeNull();

    clasesBasicas.forEach(claseBasica =>
      expect(clasesContenedorDiv).toContain(claseBasica)
    );
  });
});

