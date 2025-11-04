import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event as RouterEvent,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
})
export class PreloaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  fadeOut = false;
  private routerSub!: Subscription;
  private loadStartTime = 0;
  private readonly MIN_DISPLAY_TIME = 2000; // ⏱️ 2 segundos mínimo

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.showLoader();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.hideLoader();
      }
    });
  }

  private showLoader(): void {
    this.isLoading = true;
    this.fadeOut = false;
    this.loadStartTime = Date.now();
  }

  private hideLoader(): void {
    const elapsed = Date.now() - this.loadStartTime;
    const remaining = this.MIN_DISPLAY_TIME - elapsed;

    // Espera el tiempo restante si fue muy rápido
    const delay = remaining > 0 ? remaining : 0;

    setTimeout(() => {
      this.fadeOut = true; // activa animación CSS
      setTimeout(() => {
        this.isLoading = false; // finalmente lo oculta
      }, 500); // ⏳ coincide con la duración del fade en CSS
    }, delay);
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
