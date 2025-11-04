import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const bootstrap: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngAfterViewInit(): void {
    // Escucha cuando termina la navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Si hay fragmento (#seccion), intenta hacer scroll
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          // 🔹 Espera un pequeño tiempo para asegurar que el DOM ya está listo
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(fragment);
          }, 200);
        }
      });
  }

  closeOffcanvas() {
    const offcanvasEl = document.querySelector('.offcanvas.show');
    if (offcanvasEl) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (offcanvas) {
        offcanvas.hide();
      }
    }
  }
}
