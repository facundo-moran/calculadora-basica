<div style="text-align: center">
  <img src="./public/images/svg/angular.svg" style="max-width: 200px;" />
  <h1>Calculadora Básica</h1>
</div>

## Durante el desarrollo de esta aplicación utilice los siguientes conceptos

### Signal
---
	Como se explica en la documentación oficial una señal es una envoltura para un valor primitivo o complejo que notificará, a los interesados en el valor, cuando el mismo cambie y pueden ser de solo lectura como modificables.

### Output() - outputs de componentes basado en función
---
	La funcion output() que nos permite emitir valores hacia componentes padres. 
	Los contenedores padres pueden obtener los valores emitidos usando la sintaxis "event binding".

```
import {Component, output} from '@angular/core';

@Component({...})
export class MyComp {
  clicked = output<string>()    // OutputEmitterRef<string>
  setNewName(newName: string) {
    this.clicked.emit(newName);
  }
}
```

```
# Ejemplo de "event binding"

<button
  (click)="onClicked()"
>
  click me
</button>
```

### ViewChild - View Queries as signals
---
	Como su nombre indica, nos permiten realizar consultas o búsquedas dentro de las vistas (templates html) en busca de un único elemento, cuyo valor será envuelto en una señal o en caso de no encontrarlo undefined.

```
@Component({
  template:
	<div #el></div>
    <my-component />
})
export class TestComponent {
  // query for a single result by a string predicate  
  divEl = viewChild<ElementRef>('el')  // Signal<ElementRef|undefined>
  // query for a single result by a type predicate
  cmp = viewChild(MyComponent);        // Signal<MyComponent|undefined>
}
```

```
# Ejemplo de viewChild

@Component({
  template: `
    <div #el></div>
    <my-component />
  `
})
export class TestComponent {
  // query for a single result by a string predicate  
  divEl = viewChild<ElementRef>('el')  // Signal<ElementRef|undefined>
  // query for a single result by a type predicate
  cmp = viewChild(MyComponent);        // Signal<MyComponent|undefined>
}
```

### ViewChildren - View Queries as signals
---
	Como su nombre indica, nos permiten realizar consultas o búsquedas dentro de las vistas (templates html) en busca de todos los elementos, cuyo valor será envuelto en una señal de solo lectura o en caso de no encontrarlo undefined.
### Ng-content - Content Projection 
---
	Es el elemento <ng-content> de Angular que nos permite indicar dentro de un componente, el lugar en donde se va a proyectar o renderizar el contenido que especifiquemos.

```
// Component source
@Component({
  selector: 'custom-card',
  template: `
    <div class="card-shadow">
      <ng-content />
    </div>
  `,
})
export class CustomCard {/* ... */}
```

```
# Ejemplo de Content Projection

// Component source
@Component({
  selector: 'custom-card',
  template: `
    <div class="card-shadow">
      <ng-content />
    </div>
  `,
})
export class CustomCard {/* ... */}
```

### Host - Binding to the host element
---
	El elemento host de un componente es el elemento del DOM que hace match con su selector. El contenido del template html del componente siempre se renderiza dentro dentro de su elemento host.

	Un componente tiene el poder de enlazar propiedades, atributos y eventos a su elemento host haciendo uso de la propiedad host dentro del decorador @Component.

```
@Component({
  ...,
  host: {
    'role': 'slider',
    '[attr.aria-valuenow]': 'value',
    '[tabIndex]': 'disabled ? -1 : 0',
    '(keydown)': 'updateValue($event)',
  },
})
export class CustomSlider {
  value: number = 0;
  disabled: boolean = false;
  updateValue(event: KeyboardEvent) { /* ... */ }
  /* ... */
}
```

---
### Referencias
- [Función output](https://angular.dev/guide/components/output-fn)
- [Consulta de elementos como señal](https://angular.dev/guide/signals/queries#viewchild)
- [Proyección de contenido](https://angular.dev/guide/components/content-projection)
- [Propiedad host](https://angular.dev/guide/components/host-elements#the-hostbinding-and-hostlistener-decorators)
