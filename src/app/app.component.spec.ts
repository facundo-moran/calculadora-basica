import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import {
  AppComponent
} from "./app.component";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges(); // Detecta cambios en el componente
  });

  it("should be 3", () => {
    /*
      *   PREPARACION
    */
    const num1 = 1;
    const num2 = 2;

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    const res = num1 + num2;

    /*
      *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(res).toBe(3);
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should render router-outlet", () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render my name in header and footer spans', () => {
    /*
      *   PREPARACION
    */
    // Seleccionamos los elementos de los spans dentro del header y el footer
    const headerSpan = compiled.querySelector('header span.texto-palo-alto');
    const footerSpan = compiled.querySelector('footer span.texto-palo-alto');

    /*
    *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
  */
    expect(headerSpan?.textContent).toContain("Facundo Morán");
    expect(footerSpan?.textContent).toContain("Facundo Morán");
  });

  it('should have the class "texto-palo-alto" in header and footer spans', () => {
    /*
      *   PREPARACION
    */
    // Seleccionamos los elementos de los spans dentro del header y el footer
    const headerSpan = compiled.querySelector('header span.texto-palo-alto');
    const footerSpan = compiled.querySelector('footer span.texto-palo-alto');

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    const textGradientClass = 'texto-palo-alto';

    //mustHaveClasses

    /*
      *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(headerSpan?.classList.contains(textGradientClass)).toBe(true);
    expect(footerSpan?.classList.contains(textGradientClass)).toBe(true);
  });

  it('should have my github profile link in footer', () => {
    /*
      *   PREPARACION
    */
    // Seleccionamos los elementos
    const footerAnchors = compiled.querySelectorAll('footer a');

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    const githubProfileLink = 'https://github.com/facundo-moran';
    let isGitubProfileLinked: boolean = false;

    /*
    *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(footerAnchors.length).toBeGreaterThan(0);

    footerAnchors.forEach(anchor => {
      const existGithubProfileAnchor = anchor.getAttribute('href') === githubProfileLink

      if (existGithubProfileAnchor) isGitubProfileLinked = true;
    });

    expect(isGitubProfileLinked).toBe(true);
  });
})
