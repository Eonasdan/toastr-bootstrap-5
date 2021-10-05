import {Component, QueryList, Renderer2, VERSION, ViewChildren} from '@angular/core';
import {BootstrapToast, BootstrapToastConfig} from './BootstrapToast';
import {GlobalConfig, ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {BootstrapContextEnum} from './bootstrap-context-enum';
import {NotificationService} from './notification.services';


interface Quote {
  title?: string;
  message?: string;
}

const quotes: Quote[] = [
  {
    title: 'Title',
    message: 'Message',
  },
  {
    title: '😃',
    message: 'Supports Emoji',
  },
  {
    message: 'My name is Inigo Montoya. You killed my father. Prepare to die!',
  },
  {
    message: 'Titles are not always needed',
  },
  {
    title: 'Title only 👊',
  },
  {
    title: '',
    message: `Supports Angular ${VERSION.full}`,
  },
];
const types = ['success', 'error', 'info', 'warning'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rnd = (up_boundary = 5, low_boundary = 20) =>
    Math.floor(Math.random() * (up_boundary - low_boundary + 1)) + low_boundary;
  randomEnumKey = (enumeration: any) => {
    const keys = Object.keys(enumeration).filter(
      k => !(Math.abs(Number.parseInt(k)) + 1)
    );
    return keys[Math.floor(Math.random() * keys.length)];
  };

  randomEnumValue = (enumeration: any) => enumeration[this.randomEnumKey(enumeration)];

  options: BootstrapToastConfig;
  title = '';
  message = '';
  type = this.randomEnumValue(BootstrapContextEnum);
  version = VERSION;
  private lastInserted: number[] = [];
  @ViewChildren(ToastContainerDirective) inlineContainers!: QueryList<ToastContainerDirective>;

  constructor(public toastr: ToastrService, private readonly notificationService: NotificationService) {
    this.options = this.toastr.toastrConfig as BootstrapToastConfig;
  }

  getMessage() {
    let m: string | undefined = this.message;
    let t: string | undefined = this.title;
    if (!this.title.length && !this.message.length) {
      const randomMessage = quotes[this.rnd(0, quotes.length - 1)];
      m = randomMessage.message;
      t = randomMessage.title;
    }
    return {
      message: m,
      title: t,
    };
  }

  openToast() {
    const opt = Object.assign({}, this.options);
    opt.toastComponent = BootstrapToast;
    opt.context = this.type
    const {message, title} = this.getMessage();
    const inserted = this.toastr.show(message, title, opt);
    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  clearToasts() {
    this.toastr.clear();
  }

  clearLastToast() {
    this.toastr.clear(this.lastInserted.pop());
  }

  fixNumber(field: keyof GlobalConfig): void {
    (this.options as any)[field] = Number(this.options[field]) as any;
  }

  nsSuccess() {
   this.notificationService.success('YEAH!');
  }

  nsDanger() {
    this.notificationService.error('Boo :(');
  }

  nsAlert() {
    this.notificationService.alert('Something happened', 'Just wanted to let you know.');
  }

  nsConfirm() {
    this.notificationService.confirmation('Are you sure?')?.subscribe(result => {
      if (result) {
        this.notificationService.success('Clicked Ok!');
      }
      else {
        this.notificationService.error('Clicked Cancel');
      }
    })
  }
}
