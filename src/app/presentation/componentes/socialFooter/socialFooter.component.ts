import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './socialFooter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialFooterComponent {
  @Input() usuarioInstagram: string = '';
  @Input() usuarioLinkedin: string = '';
  @Input() usuarioGithub: string = '';
  @Input() nombre: string = '';

  get anioActual(): number {
    return new Date().getFullYear();
  }
}
