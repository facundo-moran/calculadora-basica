import {
  ComponentFixture,
  TestBed
} from "@angular/core/testing";

import {
  By
} from "@angular/platform-browser";
import {

  CalculadoraBasicaService,
  CalculadoraEstadoBasico
} from "@/core/application/services/calculadora-basica.service";

import {
  CalculadoraBasicaComponent
} from "./calculadora-basica.component";

import {
  BotonCalculadoraComponent
} from "../boton-calculadora/boton-calculadora.component";

const mockEstado: CalculadoraEstadoBasico = {
  resultado: '100',
  subResultado: '0',
  ultimaOperacion: ''
};

/*
  MOCK SERVICE
*/
class MockCalculadoraBasicaService {
  estado = jasmine.createSpy('estado').and.returnValue(mockEstado);

  procesar = jasmine.createSpy('procesar');
}

describe('CalculadoraBasicaComponent', () => {
  let fixture: ComponentFixture<CalculadoraBasicaComponent>;
  let compiled: HTMLElement;
  let component: CalculadoraBasicaComponent;

  let mockCalculadoraBasicaService: CalculadoraBasicaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalculadoraBasicaComponent
      ],
      providers: [
        {
          provide: CalculadoraBasicaService,
          useClass: MockCalculadoraBasicaService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraBasicaComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculadoraBasicaService = TestBed.inject(CalculadoraBasicaService) as unknown as CalculadoraBasicaService;

    fixture.detectChanges();
  });

  it('should be created', () => {
    const component = fixture.componentInstance;

    console.log(compiled);

    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.estado()).toEqual(mockEstado);
  });

  it('should count 19 calculator button components', () => {
    const totalBotones: number = 19;

    expect(component.botonesArr).toBeTruthy();
    expect(component.botonesArr().length).toBe(totalBotones);
  });

  it('should count 19 <boton-calculadora /> components', () => {
    const totalBotonesProjected = compiled.querySelectorAll('boton-calculadora').length;
    const totalBotones: number = 19;

    expect(totalBotonesProjected).toBeTruthy();
    expect(totalBotonesProjected).toBe(totalBotones);
  });

  it('should count 19 <boton-calculadora /> components as debug elements', () => {
    /*
      DEBUG ELEMENTS SE PUEDEN TRATAR COMO EL FIXTURE
    */
    const buttonsByDirective = fixture.debugElement.queryAll(By.directive(BotonCalculadoraComponent));
    const totalBotones: number = 19;

    expect(buttonsByDirective).toBeTruthy();
    expect(buttonsByDirective.length).toBe(totalBotones);
  });

  it("should have 'C' as first button", () => {
    const firstButtonByDirective = compiled.querySelector('boton-calculadora');
    const contenidoPrimerBoton: string = 'c';

    expect(firstButtonByDirective?.textContent?.trim()).toBe(contenidoPrimerBoton);
  });

  it("should handle keyboard events matching calculator keys", () => {
    const eventType: string = 'keyup';
    const keyName: string = 'Enter';

    const operationKeySanititerRecord: Record<string, string> = {
      'Enter': '='
    };

    const eventEmitted = new KeyboardEvent(eventType, {
      key: keyName
    });

    /*
      dispatchEvent:
        Lanza un evento en el sistema de eventos. El evento está sujeto al mismo comportamiento y
        capacidades que si fuera un evento de lanzamiento directo.
    */
    document.dispatchEvent(eventEmitted);

    expect(mockCalculadoraBasicaService.procesar).toHaveBeenCalledWith(operationKeySanititerRecord[keyName]);
  });
});
