import { CalculadoraBasica } from "@/core/domain/calculadora-basica";

describe('CalculadoraBasica', () => {
  const operacionDeSuma = "+";
  const operacionDeResta = "-";
  const operacionDeMultiplicacion = "x";
  const operacionDeDivision = "÷";
  const operacionDeIgual = "=";

  let calculadora: CalculadoraBasica;
  let subResultadoEsperado: string;
  let ultimaOperacionEsperada: string;

  beforeEach(() => {
    calculadora = new CalculadoraBasica();
    subResultadoEsperado = '0';
    ultimaOperacionEsperada = '';
  });

  /*
    OTROS CICLOS DE VIDA
  */
  // afterEach
  // beforeAll
  // afterAll

  it('should be created', () => {
    expect(calculadora).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(calculadora.resultado).toBe('0');
    expect(calculadora.subResultado).toBe('0');
    expect(calculadora.ultimaOperacion).toBe('');
  });

  it('should reset to default values when "c" is pressed', () => {
    /*
      *   PREPARACION
    */
    const numerosAleatorios = ['1', '2', '5'];
    const operacionDeReset = "c";
    const operacionDeSuma = "+";

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    numerosAleatorios.forEach(num => calculadora.procesar(num)); //125
    calculadora.procesar(operacionDeSuma); //+
    numerosAleatorios.forEach(num => calculadora.procesar(num)); //125

    calculadora.procesar(operacionDeReset); //clear

    /*
    *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(calculadora.resultado).toBe('0');
    expect(calculadora.subResultado).toBe('0');
    expect(calculadora.ultimaOperacion).toBe('');
  });

  it('should process values correctly for "+" operation after pressing "="', () => {
    /*
      *   PREPARACION
    */
    const numerosIngresados = ['2', '5', '0'];
    const resultadoEsperado = 500;

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    numerosIngresados.forEach(num => calculadora.procesar(num)); //250
    calculadora.procesar(operacionDeSuma); //+
    numerosIngresados.forEach(num => calculadora.procesar(num)); //250

    /*
    *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(calculadora.ultimaOperacion).toBe(operacionDeSuma);

    calculadora.procesar(operacionDeIgual); //=

    expect(calculadora.resultado).toBe(resultadoEsperado.toString());
    expect(calculadora.subResultado).toBe(subResultadoEsperado);
    expect(calculadora.ultimaOperacion).toBe(ultimaOperacionEsperada);
  });

  it('should process values correctly for "-" operation after pressing "="', () => {
    /*
      *   PREPARACION
    */
    const numerosIngresados1 = ['2', '5', '0'];
    const numerosIngresados2 = ['5', '0'];
    const resultadoEsperado = 200;

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    numerosIngresados1.forEach(num => calculadora.procesar(num)); //250
    calculadora.procesar(operacionDeResta); //-
    numerosIngresados2.forEach(num => calculadora.procesar(num)); //200

    /*
    *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(calculadora.ultimaOperacion).toBe(operacionDeResta);

    calculadora.procesar(operacionDeIgual); //=

    expect(calculadora.resultado).toBe(resultadoEsperado.toString());
    expect(calculadora.subResultado).toBe(subResultadoEsperado);
    expect(calculadora.ultimaOperacion).toBe(ultimaOperacionEsperada);
  });

  it('should process values correctly for "*" operation after pressing "="', () => {
    /*
      *   PREPARACION
    */
    const numerosIngresados1 = ['2', '5'];
    const numerosIngresados2 = ['4'];
    const resultadoEsperado = 100;

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    numerosIngresados1.forEach(num => calculadora.procesar(num)); //250
    calculadora.procesar(operacionDeMultiplicacion); // *
    numerosIngresados2.forEach(num => calculadora.procesar(num)); //50

    /*
    *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(calculadora.ultimaOperacion).toBe(operacionDeMultiplicacion);

    calculadora.procesar(operacionDeIgual); //=

    expect(calculadora.resultado).toBe(resultadoEsperado.toString());
    expect(calculadora.subResultado).toBe(subResultadoEsperado);
    expect(calculadora.ultimaOperacion).toBe(ultimaOperacionEsperada);
  });

  it('should process values correctly for "÷" operation after pressing "="', () => {
    /*
      *   PREPARACION
    */
    const numerosIngresados1 = ['2', '5', '0'];
    const numerosIngresados2 = ['5', '0'];
    const resultadoEsperado = 5;

    /*
      *   ESTIMULO (ACCION DE UN USUARIO)
    */
    numerosIngresados1.forEach(num => calculadora.procesar(num)); //250
    calculadora.procesar(operacionDeDivision); // /
    numerosIngresados2.forEach(num => calculadora.procesar(num)); //50

    /*
    *   CONFIRMACION (toBe para confirmar un valor primitivo exacto)
    */
    expect(calculadora.ultimaOperacion).toBe(operacionDeDivision);

    calculadora.procesar(operacionDeIgual); //=

    expect(calculadora.resultado).toBe(resultadoEsperado.toString());
    expect(calculadora.subResultado).toBe(subResultadoEsperado);
    expect(calculadora.ultimaOperacion).toBe(ultimaOperacionEsperada);
  });
});
