export class CalculadoraBasica {
  private numerosPermitidosArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private operacionesPermitidasArr = [',', '+/-', '+', '-', 'x', '÷'];
  private operacionesEspecialesArr = ['=', '%', 'c', 'Backspace'];

  private resultadoStr: string = '0';
  private subResultadoStr: string = '0';
  private ultimaOperacionStr: string = '';

  /*
    GETTERS
  */
  get resultado(): string {
    return this.resultadoStr;
  }

  get subResultado(): string {
    return this.subResultadoStr;
  }

  get ultimaOperacion(): string {
    return this.ultimaOperacionStr;
  }

  /*
    RESETEAR
  */
  resetear(): void {
    this.resultadoStr = '0';
    this.subResultadoStr = '0';
    this.ultimaOperacionStr = '';
  }

  /*
    FORMATEAR NUMERO
  */
  formatoESAR(input: string): string {
    // Elimina espacios en blanco y verifica si el string está vacío
    const trimmedInput = input.trim();
    if (trimmedInput === '') {
      throw new Error('Input string is empty');
    }

    // Verifica si el string tiene un signo negativo al inicio
    const isNegative = trimmedInput.startsWith('-');

    // Elimina el signo negativo para el procesamiento
    const absInput = isNegative ? trimmedInput.slice(1) : trimmedInput;

    // Reemplaza cualquier separador decimal (por si acaso hay alguna coma o punto en el input)
    let cleanedInput = absInput;

    if (this.ultimaOperacionStr !== '=')
      cleanedInput = absInput.replace('.', '');

    if (cleanedInput.includes(',')) {
      cleanedInput = cleanedInput.replace('.', '');
      cleanedInput = cleanedInput.replace(',', '.');
    }

    // Convierte el string limpio a número flotante
    const numero = parseFloat(cleanedInput);

    if (isNaN(numero)) {
      throw new Error('Invalid number format');
    }

    // Convierte el número a un formato con separadores de miles
    let formattedNumber = numero.toLocaleString('es-AR', { maximumFractionDigits: 6 });

    if (formattedNumber.length > 12) {
      formattedNumber = numero.toLocaleString('es-AR', { maximumFractionDigits: 2 });
    }

    if (formattedNumber.length > 12) {
      formattedNumber = formattedNumber.substring(0, 9);
    }

    // Añade el signo negativo si era necesario
    return isNegative ? `-${formattedNumber}` : formattedNumber;
  }

  parsearNumeroESAR(numero: string): number {
    // Elimina los separadores de miles y convierte la cadena a un número
    let numeroSanitizado = numero.replace(/\./g, '').replace('.', '');
    numeroSanitizado = numero.replace(/\./g, '').replace(',', '.');
    return parseFloat(numeroSanitizado);
  }

  /**
   *  PROCESAMINETO DE INPUT NUMEROS
   */
  procesarNumeroPermitido(numero: number): void {
    const valorActualEsCero = this.resultadoStr === '0' || this.resultadoStr === '-0';
    const valorActualEsNegativo = this.resultadoStr.includes('-');

    /*
      LA CALCULADORA ESTA EN 0
    */
    if (valorActualEsCero) {
      if (valorActualEsNegativo) {
        // this.resultadoStr = this.formatoESAR(parseFloat('-' + numero));
        this.resultadoStr = this.formatoESAR('-' + numero);
        return;
      }

      // this.resultadoStr = this.formatoESAR(numero);
      this.resultadoStr = this.formatoESAR(numero.toString());
      return;
    }

    // this.resultadoStr = this.formatoESAR(parseFloat(this.resultadoStr + numero));
    this.resultadoStr = this.formatoESAR(this.resultadoStr + numero);
  }

  /**
   *  PROCESAMIENTO DE OPERACIONES ESPECIALES
   */
  procesarOperacionEspecial(operacion: string): void {
    /*
      OPERACION DE RESET
    */
    if (operacion === 'c') {
      this.resetear();
      return;
    }

    /*
      OPERACION DE BORRADO
    */
    if (operacion === 'Backspace') {
      if (this.resultadoStr === '0') return;

      if (this.resultadoStr.length === 1) {
        // this.resultadoStr = this.formatoESAR(0);
        this.resultadoStr = this.formatoESAR('0');
        return;
      }

      if (this.resultadoStr.length === 2 && this.resultadoStr.includes('-')) {
        // this.resultadoStr = this.formatoESAR(0);
        this.resultadoStr = this.formatoESAR('0');
        return;
      }

      // this.resultadoStr = this.formatoESAR(parseFloat(this.resultadoStr.slice(0, -1)));
      this.resultadoStr = this.formatoESAR(this.resultadoStr.slice(0, -1));

      return;
    }

    if (operacion === '=') {
      this.calcular(this.ultimaOperacion);
      this.subResultadoStr = '0';
      this.ultimaOperacionStr = '';
      return;
    }
  }

  /**
   *  PROCESAMIENTO DE OPERACIONES PRINCIPALES
   */
  procesarOperacionPermitida(operacion: string): void {
    const valorActualEsNegativo = this.resultadoStr.includes('-');
    const esDecimalValido = operacion === ',' && !this.resultadoStr.includes(',');

    /*
      OPERACION DE CAMBIO DE SIGNO
    */
    if (operacion === '+/-') {
      valorActualEsNegativo ?
        // this.resultadoStr = this.formatoESAR(parseFloat(this.resultadoStr.slice(1)))
        this.resultadoStr = this.formatoESAR(this.resultadoStr.slice(1))
        // : this.resultadoStr = this.formatoESAR(parseFloat('-' + this.resultadoStr));
        : this.resultadoStr = this.formatoESAR('-' + this.resultadoStr);

      return;
    }

    /*
      OPERACION DE PUNTO DECIMAL
    */
    if (operacion === ',') {
      if (esDecimalValido) {
        if (this.resultadoStr === '0') {
          // this.resultadoStr = this.formatoESAR(parseFloat(this.resultadoStr + '.'));
          this.resultadoStr = this.formatoESAR(this.resultadoStr + ',');
        }
        if (this.resultadoStr.length === 0) {
          // this.resultadoStr = this.formatoESAR(parseFloat(this.resultadoStr + '0.'));
          this.resultadoStr = this.formatoESAR('0,');
        }

        this.resultadoStr = this.resultadoStr + ','
      }

      return;
    }

    if (this.ultimaOperacion) {
      this.calcular(operacion);
    } else {
      this.ultimaOperacionStr = operacion;
    }

    this.ultimaOperacionStr = operacion;
    this.subResultadoStr = this.resultadoStr;
    // this.resultadoStr = this.formatoESAR(0);
    this.resultadoStr = this.formatoESAR('0');
  }

  procesar(valor: string): void {
    const esNumeroPermitido = this.numerosPermitidosArr.includes(valor);
    const esOperacionPermitida = this.operacionesPermitidasArr.includes(valor);
    const esOperacionEspecial = this.operacionesEspecialesArr.includes(valor);

    const esValorPermitido = esNumeroPermitido || esOperacionPermitida || esOperacionEspecial;

    if (!esValorPermitido) return;

    if (esOperacionEspecial) {
      this.procesarOperacionEspecial(valor);
    }

    if (this.subResultadoStr.length > 10) {
      this.resetear();
      return;
    }

    if (esOperacionPermitida) {
      this.procesarOperacionPermitida(valor);
    }

    if (this.resultadoStr.length > 7) return;

    if (esNumeroPermitido) {
      this.procesarNumeroPermitido(parseFloat(valor));
    }
  }

  calcular(operacion: string): void {
    this.ultimaOperacionStr = "=";

    const valorAnterior = this.parsearNumeroESAR(this.subResultadoStr);
    const valorActual = this.parsearNumeroESAR(this.resultadoStr);

    let resultado = 0;

    switch (operacion) {
      case '+': {
        resultado = valorAnterior ? valorAnterior + valorActual : valorActual;
        break;
      }
      case '-': {
        resultado = valorAnterior ? valorAnterior - valorActual : valorActual;
        break;
      }
      case 'x': {
        resultado = valorAnterior * valorActual;
        break;
      }
      case '÷': {
        const divisor = valorActual ? valorActual : 1;
        const dividendo = valorAnterior ? valorAnterior : 0;
        resultado = dividendo / divisor;
        break;
      }
    }

    // this.resultadoStr = this.formatoESAR(resultado)
    this.resultadoStr = this.formatoESAR(resultado.toString());
    //this.resultadoStr = String(resultado);
  }
}
