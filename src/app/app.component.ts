import { Component } from '@angular/core';

import { MainLayoutComponent } from './presentation/layout/mainLayout/mainLayout.component';

@Component({
    selector: 'app-root',
    imports: [MainLayoutComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculadora-basica';
}
