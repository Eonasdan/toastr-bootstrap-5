import { Injectable } from '@angular/core';
import {GlobalConfig, ToastrService} from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import {NotificationModalComponent} from './notification-modal.component';
import {BootstrapToast, BootstrapToastConfig} from './BootstrapToast';
import {BootstrapContextEnum} from './bootstrap-context-enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // @ts-ignore
  private readonly toastrDefaults = {
    timeOut: 5000,
    closeButton: true,
    enableHtml: true,
    tapToDismiss: false,
    titleClass: '',
    positionClass: 'toast-bottom-right',
    context: undefined,
    extendedTimeOut: 0,
  } as BootstrapToastConfig;

  constructor(
    private readonly toastr: ToastrService,
    private readonly modalService: BsModalService
  ) {}

  /**
   * Creates a toast success notification. Wrapper call to notify.
   * @param message Text to display in the toast
   */
  success(message: string) {
    this.notify(message, BootstrapContextEnum.Success);
  }

  /**
   * Creates a toast error notification. Wrapper call to notify.
   * @param message Text to display in the toast
   */
  error(message: string) {
    this.notify(message, BootstrapContextEnum.Danger, 5);
  }

  /**
   * @param message The notification message contents.
   * @param style The Type of notification message.
   * @param wait The time (in seconds) to wait before the notification is auto-dismissed.
   * @param dismissCallback A callback function to be invoked when the notification is dismissed.
   */
  notify(
    message: string,
    style: BootstrapContextEnum,
    wait = 1,
    dismissCallback: () => void = () => {}
  ) {
    const config = Object.assign({}, this.toastrDefaults);
    config.timeOut = wait * 1000;
    config.toastComponent = BootstrapToast;
    config.context = style;
    this.toastr.show(message, '', config);
  }

  /**
   *  Opens a confirmation modal with both "OK" and "Cancel". For notifications use alert
   * @param message Message to display in the body of the modal.
   */
  confirmation(message: string): Subject<boolean> | undefined {
    const bsModalRef = this.modalService.show(NotificationModalComponent, {
      backdrop: 'static',
      initialState: {
        message: message,
        isAlert: false,
      },
    });
    return bsModalRef?.content?.result;
  }

  /**
   * Opens an alert modal. This modal only has an "OK" button. For cancellable actions, use openConfirmationDialog.
   * @param title The dialog title.
   * @param message  The dialog contents.
   */
  alert(message: string, title = 'Notice'): Subject<boolean> | undefined {
    const bsModalRef = this.modalService.show(NotificationModalComponent, {
      backdrop: 'static',
      initialState: {
        title: title,
        message: message,
        isAlert: true,
      },
    });
    return bsModalRef?.content?.result;
  }
}
