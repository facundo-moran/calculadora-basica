import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { RouterOutlet } from '@angular/router';

import {
  SocialFooterComponent
} from '@/presentation/componentes/socialFooter/socialFooter.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    SocialFooterComponent,
    RouterOutlet
  ],
  templateUrl: './mainLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent { }
