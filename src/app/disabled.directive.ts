import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appDisabled]'
})
export class DisabledDirective {
  @Input('appDisabled')
  control: FormControl;

  @Input()
  set disable(disabled: boolean) {
    if (!this.control) {
      return;
    }
    this.control.reset({value: '', disabled}, {emitEvent: false});
  }
}
