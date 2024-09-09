import { Component } from '@angular/core';

import { MainLayoutComponent } from './presentation/layout/mainLayout/mainLayout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculadora-basica';
}
