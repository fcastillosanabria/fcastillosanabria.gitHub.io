import { AfterViewInit, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css']
})
export class CustomCursorComponent implements AfterViewInit {
  private bigCursor!: HTMLElement;
  private smallCursor!: HTMLElement;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.bigCursor = this.el.nativeElement.querySelector('#big-cursor');
    this.smallCursor = this.el.nativeElement.querySelector('#small-cursor');

    // Aplicar comportamiento a enlaces y botones
    const clickableElements = document.querySelectorAll('a, button');
    clickableElements.forEach(elem => {
      this.renderer.addClass(this.smallCursor, 'pulse-active');

      elem.addEventListener('mouseenter', () => {
        this.setCursorColor('red', true);
      });

      elem.addEventListener('mouseleave', () => {
        this.setCursorColor('orange', false);
      });
    });
  }

  // Detectar movimiento del mouse
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;

    this.renderer.setStyle(this.bigCursor, 'left', `${clientX - 25}px`);
    this.renderer.setStyle(this.bigCursor, 'top', `${clientY - 25}px`);

    this.renderer.setStyle(this.smallCursor, 'left', `${clientX - 12}px`);
    this.renderer.setStyle(this.smallCursor, 'top', `${clientY - 12}px`);
  }

  private setCursorColor(color: string, active: boolean) {
    this.bigCursor.style.setProperty('--cursor-color', color);
    this.smallCursor.style.setProperty('--cursor-color', color);

    if (active) {
      this.renderer.addClass(this.bigCursor, 'pulse-active');
    } else {
      this.renderer.removeClass(this.bigCursor, 'pulse-active');
    }
  }
}
