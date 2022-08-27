import { Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';

@Component({
  selector: 'meal-time-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public disabled = false;

  @Input()
  public variant: ButtonVariant = 'primary';

  @Input()
  public value = 'Button';
}
