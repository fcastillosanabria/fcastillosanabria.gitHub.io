import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  constructor(private el: ElementRef) {}

  // Animaciones al cargar la vista
  ngAfterViewInit(): void {

    this.animateSectionLeft('.skills-section');
    this.animateCardsGroup();
  }

  // 🔹 Función 1: animación de sección desde la izquierda
  private animateSectionLeft(sectionClass: string): void {
    // Animación de aparición con desvanecimiento hacia arriba
    gsap.from('#contenedorProyectos', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contenedorProyectos',
        start: 'top 90%',
        end: 'bottom 60%',
        toggleActions: 'play reverse play reverse',
        markers: false // Cambiado a false para no mostrar marcadores
      }
    });
  }

// 🔹 Función 2: animación de tarjetas agrupadas de 3 en 3 con trigger global de sección
private animateCardsGroup(): void {
  const cards = this.el.nativeElement.querySelectorAll('.col') as NodeListOf<HTMLElement>;
  const cardArray = Array.from(cards);

  // 🔸 Timeline global controlado por toda la sección
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#contenedorHabilidades',
      start: 'top 70%',
      end: 'bottom 50%',
      toggleActions: 'play reverse play reverse',
      markers: false
    }
  });

  // 🔸 Recorremos los grupos de 3
  for (let i = 0; i < cardArray.length; i += 3) {
    const group = cardArray.slice(i, i + 3);
    const groupIndex = i / 3;

    // Alternar dirección
    const animationDirection =
      groupIndex % 2 === 0
        ? { x: 100 } // grupos pares → desde la derecha
        : { x: -100 }; // grupos impares → desde la izquierda

    // Añadimos animación al timeline (todas bajo el mismo trigger)
    tl.from(group, {
      ...animationDirection,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2
    }, 0); // 👈 todas comienzan a la vez (puedes usar '+=0.3' si quieres un pequeño delay)
  }
}



  // Lista de roles que se van escribiendo
  roles: string[] = [
    "Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI Specialist",
    "Systems Administrator",
    "Database Administrator",
    "Full Stack Developer",
    "Administrator"
  ];

  currentRole = '';
  private roleIndex = 0;
  private typingSpeed = 150;
  private erasingSpeed = 100;

  // Rotación de imágenes
  images: string[] = [
    'assets/img/linux-pc.png',
    'assets/img/linuxOS.png',
    'assets/img/linuxSleeping.png'
  ];

  currentImage = 'assets/img/logoLinux.png';
  private imageIndex = 0;
  isFading = false;

  ngOnInit(): void {
    this.startRoleAnimation();
    this.startImageRotation();
  }

  /** ===============================
   * Animación de texto (typing effect)
   * =============================== */
  private startRoleAnimation(): void {
    const role = this.roles[this.roleIndex];
    this.typeEffect(role, () => {
      setTimeout(() => {
        this.eraseEffect(() => {
          this.roleIndex = (this.roleIndex + 1) % this.roles.length;
          this.startRoleAnimation();
        });
      }, 1000);
    });
  }

  private typeEffect(text: string, callback: () => void): void {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        this.currentRole += text[i];
        i++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, this.typingSpeed);
  }

  private eraseEffect(callback: () => void): void {
    const interval = setInterval(() => {
      if (this.currentRole.length > 0) {
        this.currentRole = this.currentRole.slice(0, -1);
      } else {
        clearInterval(interval);
        callback();
      }
    }, this.erasingSpeed);
  }

  /** ===============================
   * Rotación de imágenes
   * =============================== */
  private startImageRotation(): void {
    setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.imageIndex = (this.imageIndex + 1) % this.images.length;
        this.currentImage = this.images[this.imageIndex];
        this.isFading = false;
      }, 1000);
    }, 4000);
  }
}
