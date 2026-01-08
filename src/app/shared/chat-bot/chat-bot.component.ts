import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent implements AfterViewInit {
  private chatStatus!: HTMLElement;
  private chatBtn!: HTMLElement;
  private chatWindow!: HTMLElement;
  private closeChat!: HTMLElement;
  private sendBtn!: HTMLElement;
  private chatInput!: HTMLInputElement;
  private chatBody!: HTMLElement;

  private currentStep = 'menu';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.chatStatus = this.el.nativeElement.querySelector('#chatStatus');
    this.chatBtn = this.el.nativeElement.querySelector('#whatsappBtn');
    this.chatWindow = this.el.nativeElement.querySelector('#whatsappChat');
    this.closeChat = this.el.nativeElement.querySelector('#closeChat');
    this.sendBtn = this.el.nativeElement.querySelector('#sendBtn');
    this.chatInput = this.el.nativeElement.querySelector('#chatInput');
    this.chatBody = this.el.nativeElement.querySelector('#chatBody');

    // 👉 Eventos principales
    this.chatBtn.addEventListener('click', () => {
      this.chatWindow.classList.toggle('d-none');
    });

    this.closeChat.addEventListener('click', () => {
      this.chatWindow.classList.add('d-none');
    });

    this.sendBtn.addEventListener('click', () => this.handleUserInput());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserInput();
    });

    // Mensaje inicial
    setTimeout(() => {
      // Mostrar múltiples mensajes secuencialmente ademas del estado de "escribiendo..."
      this.showMessagesSequentially([
        '👋 ¡Hola! Soy el asistente virtual de Francis.',
        '¿Qué deseas conocer sobre Francis?\n\n' +
          '1️⃣ Quién es y su perfil profesional\n' +
          '2️⃣ Habilidades y proyectos\n' +
          '3️⃣ Experiencia y estudios\n' +
          '4️⃣ Contacto directo',
      ]);
    });
  }

  // ========================
  // FUNCIONES PRINCIPALES
  // ========================

  private handleUserInput() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this.addMessage(text, 'sent');
    this.chatInput.value = '';
    setTimeout(() => this.processUserResponse(text), 700);
  }

  private processUserResponse(input: string) {
    const normalized = input.toLowerCase();
    if (this.currentStep === 'menu') {
      switch (normalized) {
        case '1':
          // Mostrar múltiples mensajes secuencialmente ademas del estado de "escribiendo..."
          this.showMessagesSequentially(
            [
              '🧑‍💼 Francis es un joven profesional apasionado por la tecnología...',
              'Especialista en soporte técnico integral, enfocado en la resolución de incidentes críticos y la creación de herramientas digitales para automatizar procesos TIC.',
              'Le interesa crear soluciones digitales, aprender nuevas tecnologías y metodologías de desarrollo.',
              '¿Deseas volver al menú principal?\n\n' + '1️⃣ Si\n' + '2️⃣ No\n',
            ],
            () => (this.currentStep = 'volverMenu')
          );
          break;
        case '2':
          // Mostrar múltiples mensajes secuencialmente ademas del estado de "escribiendo..."
          this.showMessagesSequentially(
            [
              '💡 Francis domina tanto el backend como el frontend',
              'Destaca en desarrollo web con Angular, Spring Boot, bases de datos SQL/NoSQL, y metodologías ágiles.',
              '¿Deseas volver al menú principal?\n\n' + '1️⃣ Si\n' + '2️⃣ No\n',
            ],
            () => (this.currentStep = 'volverMenu')
          );
          break;
        case '3':
          // Mostrar múltiples mensajes secuencialmente ademas del estado de "escribiendo..."
          this.showMessagesSequentially(
            [
              '🎓 Estudió Análisis de Sistemas y actualmente cursa estudios en la UNDC.',
              'Ha participado en proyectos tecnológicos relacionados con la gestión de datos y el desarrollo de software. ' +
                'Tiene experiencia como operador informático y en soporte técnico, además de un sólido trabajo en equipo demostrado en el INEI.',
              '¿Deseas volver al menú principal?\n\n' + '1️⃣ Sí\n' + '2️⃣ No\n',
            ],
            () => (this.currentStep = 'volverMenu')
          );
          break;
        case '4':
          // Mostrar múltiples mensajes secuencialmente ademas del estado de "escribiendo..."
          this.showMessagesSequentially(
            [
              '📬 Puedes contactar a Francis en: fcastillosanabria@gmail.com o +51 934179705.',
              '¿Deseas volver al menú principal?\n\n' + '1️⃣ Si\n' + '2️⃣ No\n',
            ],
            () => (this.currentStep = 'volverMenu')
          );
          break;
        default:
          this.showTyping(() =>
            this.addMessage(
              '⚠️ Elige una opción válida (1, 2, 3 o 4).',
              'received'
            )
          );
      }
    } else if (this.currentStep === 'volverMenu') {
      if (normalized === '1') {
        this.showTyping(() => {
          this.addMessage(
            '¿Qué deseas conocer sobre Francis?\n\n' +
              '1️⃣ Quién es y su perfil profesional\n' +
              '2️⃣ Habilidades y proyectos\n' +
              '3️⃣ Experiencia y estudios\n' +
              '4️⃣ Contacto directo',
            'received'
          );
          this.currentStep = 'menu';
        });
      } else if (normalized === '2') {
        this.showTyping(() => {
          this.addMessage(
            '¡Gracias por tu interés! Si deseas volver a empezar, escribe "hola".',
            'received'
          );
          this.currentStep = 'final';
        });
      } else {
        this.showTyping(() =>
          this.addMessage(
            '⚠️ Responde con 1️⃣ para Sí o 2️⃣ para No.',
            'received'
          )
        );
      }
    }
  }

  // ========================
  // FUNCIONES DE MENSAJE
  // ========================

  // Añadir mensaje al chat
  private addMessage(text: string, type: 'sent' | 'received') {
    const msg = this.renderer.createElement('div');
    msg.classList.add('message', type);

    const textSpan = this.renderer.createElement('span');
    textSpan.textContent = text;
    this.renderer.appendChild(msg, textSpan);

    // ✅ Checks SOLO para mensajes enviados
    if (type === 'sent') {
      const checks = this.renderer.createElement('i');
      checks.classList.add('bi', 'bi-check-all', 'checks');
      this.renderer.appendChild(msg, checks);
    }

    this.renderer.appendChild(this.chatBody, msg);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  // Mostrar múltiples mensajes secuencialmente ademas del estado de "escribiendo..."
  private showMessagesSequentially(messages: string[], callback?: () => void) {
    let index = 0;
    const next = () => {
      if (index >= messages.length) {
        if (callback) callback();
        return;
      }
      this.showTyping(() => {
        this.addMessage(messages[index], 'received');
        index++;
        setTimeout(next, 100);
      });
    };
    next();
  }

  // Tiempo aleatorio para el estado de "escribiendo..."
  private getRandomTypingTime(min = 800, max = 1200): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Estado de "escribiendo..." y su animación
  private showTyping(callback: () => void) {
    this.chatStatus.textContent = 'Escribiendo…';

    const typing = this.renderer.createElement('div');
    typing.classList.add('message', 'received');
    typing.innerHTML = `
    <span class="typing-dots">
      <span></span><span></span><span></span>
    </span>
  `;

    this.renderer.appendChild(this.chatBody, typing);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;

    // ⏱️ Tiempo aleatorio entre 800 y 1200 ms
    const typingTime = this.getRandomTypingTime();

    // ⏱️ Tiempo que aparece la animación
    setTimeout(() => {
      typing.remove();
      this.chatStatus.textContent = 'En línea';
      callback();
    }, typingTime);
  }
}
