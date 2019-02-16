import { DisabledDirective } from './disabled.directive';
import { FormControl } from '@angular/forms';

describe('DisabledDirective', () => {
  it('should create an instance', () => {
    const directive = new DisabledDirective();
    expect(directive).toBeTruthy();
  });

  it('should reset a form element when disable is set to true', () => {
    const ctrl = new FormControl('');
    const directive = new DisabledDirective();
    directive.control = ctrl;
    ctrl.setValue('test');
    directive.disable = true;
    expect(ctrl.value).toBe('');
  });

  it('should set the control state to disabled when disable is set to true', () => {
    const ctrl = new FormControl('');
    const directive = new DisabledDirective();
    directive.control = ctrl;
    directive.disable = true;
    expect(ctrl.status).toBe('DISABLED');
  });
});
