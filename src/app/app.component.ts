import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form">
      <div class="container">
        <div class="row">
          <div class="col-md-4 form-group">
            <label for="dob">Födelsedatum</label>
            <input
              id="dob"
              type="text"
              class="form-control"
              formControlName="dob"
              [appDisabled]="form.get('dob')"
              [disable]="pnrFilled$ | async"
            />
            <div class="invalid-feedback">Du måste ange ett födelsedatum</div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 form-group">
            <label for="pnr">Personnummer</label>
            <input
              id="pnr"
              type="text"
              class="form-control"
              formControlName="pnr"
              [appDisabled]="form.get('pnr')"
              [disable]="dobFilled$ | async"
            />
            <div class="invalid-feedback">Du måste ange ett personnummer</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="radio1"
                [value]="'yes'"
                formControlName="yesNo"
                [appDisabled]="form.get('yesNo')"
                [disable]="pnrFilled$ | async"
              />
              <label class="form-check-label" for="radio1">Ja</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="radio2"
                [value]="'no'"
                formControlName="yesNo"
              />
              <label class="form-check-label" for="radio2">Nej</label>
            </div>
            <div [class.ng-invalid]="form.get('yesNo').invalid"></div>
            <div class="invalid-feedback">Martin was here"</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              type="submit"
              [disabled]="form.invalid"
              class="btn btn-primary"
            >
              Skicka
            </button>
          </div>
        </div>
      </div>
    </form>
  `,
  styles: [
    `
      .invalid-feedback {
        display: block;
        overflow: hidden;
        max-height: 0;
        transition: max-height 300ms ease-in-out;
      }
    `,
    `
      .ng-invalid + .invalid-feedback {
        max-height: 100px;
        transition: max-height 300ms ease-in-out;
      }
    `,
    `
      :disabled.btn-primary {
        background-color: gray;
        border: none;
      }
    `
  ]
})
export class AppComponent {
  form: FormGroup;
  dobFilled$: Observable<boolean>;
  pnrFilled$: Observable<boolean>;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      pnr: fb.control('', [Validators.required]),
      dob: fb.control('', [Validators.required]),
      yesNo: fb.control('', [Validators.required])
    });

    this.dobFilled$ = this.form.get('dob').valueChanges.pipe(
      map(value => (value ? true : false)),
      distinctUntilChanged()
    );

    this.pnrFilled$ = this.form.get('pnr').valueChanges.pipe(
      map(value => (value ? true : false)),
      distinctUntilChanged()
    );
  }
}
