import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private requestCount = 0;
  private loading = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoading() {
    return this.loading.asObservable();
  }

  setLoading(value: boolean) {
    if (value) {
      this.requestCount++;
    } else {
      this.requestCount--;
    }
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loading.next(value);
    }
    else {
      this.loading.next(true);
    }
  }

}
