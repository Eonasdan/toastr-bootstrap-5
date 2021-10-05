import { Component} from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header" *ngIf="title">
      <h5 class="modal-title">{{ title }}</h5>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <!--<div class="modal-footer" *ngIf="isAlert">
      <button
        type="button"
        class="btn btn-primary"
        data-dismiss="modal"
        (click)="bsModalRef.hide(); result.next(true)"
      >
        Ok
      </button>
    </div>-->
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-success"
        data-dismiss="modal"
        (click)="bsModalRef.hide(); result.next(true)"
      >
        Ok
      </button>
      <button
        type="button"
        class="btn btn-danger"
        data-dismiss="modal"
        *ngIf="!isAlert"
        (click)="bsModalRef.hide(); result.next(false)"
      >
        Cancel
      </button>
    </div>
  `,
})
export class NotificationModalComponent {
  title = '';
  message = '';
  isAlert = true;
  result: Subject<boolean> = new Subject<boolean>();

  constructor(public bsModalRef: BsModalRef) {}
}
