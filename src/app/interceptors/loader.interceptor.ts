import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoaderService } from "./loader-service/loader.service";

@Injectable()
export class loaderInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService
  ) { }
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.setLoading(true);
    
    return handler.handle(req).pipe(
      finalize(() => {
        this.loaderService.setLoading(false);
      })
    );
  }
}