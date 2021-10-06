import { Component } from '@angular/core';
import { GlobalConfig, Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import {BootstrapContextEnum} from './bootstrap-context-enum';

@Component({
  selector: '[bootstrap-toast-component]',
  template: `
    <div
      class="toast {{ containerClass }} show"
      role="alert"
      [style.display]="state.value === 'inactive' ? 'none' : ''"
    >
      <div class="toast-header" *ngIf="title">
        <strong class="me-auto">{{ title }}</strong>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          *ngIf="options.closeButton"
          (click)="remove()"
        ></button>
      </div>
      <div class="d-flex" *ngIf="!title && options.context">
        <div class="toast-body">
          {{ message }}
        </div>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          *ngIf="options.closeButton"
          (click)="remove()"
        ></button>
      </div>
      <div class="toast-body" *ngIf="message && !options.context">
        {{ message }}
        <div class="mt-2 pt-2 border-top" *ngIf="(options.buttons?.length || 0 < 0) || (options.closeButton && !title)">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast"
                  *ngIf="options.closeButton && !title"
                  (click)="remove()">
            Close
          </button>
          <button
            *ngFor="let btn of options.buttons"
            type="button"
            class="{{ btn.style }}"
            (click)="handleClick($event, btn.id)"
          >
            {{ btn.text }}
          </button>
        </div>
      </div>
    </div>
  `,
  preserveWhitespaces: false,
})
export class BootstrapToast extends Toast {
  // @ts-ignore
  options: BootstrapToastConfig;
  containerClass = '';

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
    // @ts-ignore
    if (this.options.context) {
      this.toastClasses = ``;
      // @ts-ignore
      this.toastClasses = `toast show align-items-center bg-${this.options.context} border-0`;
    }
  }

  handleClick(event: Event, id: string) {
    event.stopPropagation();
    this.toastPackage.triggerAction(id);
    return false;
  }
}

export interface BootstrapToastConfig extends GlobalConfig {
  context: BootstrapContextEnum;
  buttons: {
    style: string;
    text: string;
    id: string;
  }[];
}
