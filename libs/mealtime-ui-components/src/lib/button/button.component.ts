import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';

@Component({
  selector: 'mt-button',
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

  @Output()
  public clicked = new EventEmitter();

  public onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
