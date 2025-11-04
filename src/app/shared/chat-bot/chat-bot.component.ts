import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements AfterViewInit {

  private chatBtn!: HTMLElement;
  private chatWindow!: HTMLElement;
  private closeChat!: HTMLElement;
  private sendBtn!: HTMLElement;
  private chatInput!: HTMLInputElement;
  private chatBody!: HTMLElement;

  private currentStep = 'menu';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
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
    this.chatInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.handleUserInput();
    });

    // Mensaje inicial
    setTimeout(() => {
      this.showMessagesSequentially([
        '👋 ¡Hola! Soy el asistente virtual de Francis.',
        '¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo'
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
          this.showMessagesSequentially([
            '🧑‍💼 Francis es un joven profesional apasionado por la tecnología...',
            'Le interesa crear soluciones digitales...',
            '¿Deseas volver al menú principal? (sí/no)'
          ], () => this.currentStep = 'volverMenu');
          break;
        case '2':
          this.showMessagesSequentially([
            '💡 Francis domina HTML, CSS, JavaScript y Angular...',
            'También tiene experiencia en proyectos web y apps QR.',
            '¿Deseas volver al menú principal? (sí/no)'
          ], () => this.currentStep = 'volverMenu');
          break;
        case '3':
          this.showMessagesSequentially([
            '🎓 Estudió Análisis de Sistemas y actualmente cursa en la UNDC...',
            'Ha participado en proyectos tecnológicos relacionados con turismo y desarrollo local.',
            '¿Deseas volver al menú principal? (sí/no)'
          ], () => this.currentStep = 'volverMenu');
          break;
        case '4':
          this.showMessagesSequentially([
            '📬 Puedes contactar a Francis en: fcastillosanabria@gmail.com o +51 934179705.',
            '¿Deseas volver al menú principal? (sí/no)'
          ], () => this.currentStep = 'volverMenu');
          break;
        default:
          this.showTyping(() => this.addMessage('⚠️ Elige una opción válida (1, 2, 3 o 4).', 'received'));
      }
    } else if (this.currentStep === 'volverMenu') {
      if (normalized === 'sí' || normalized === 'si') {
        this.showTyping(() => {
          this.addMessage(
            '¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo',
            'received'
          );
          this.currentStep = 'menu';
        });
      } else {
        this.showTyping(() => {
          this.addMessage('✨ ¡Gracias por tu interés! Si deseas volver a empezar, escribe "hola".', 'received');
          this.currentStep = 'final';
        });
      }
    } else if (this.currentStep === 'final' && normalized === 'hola') {
      this.showTyping(() => {
        this.addMessage(
          '¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo',
          'received'
        );
        this.currentStep = 'menu';
      });
    }
  }

  // ========================
  // FUNCIONES DE MENSAJE
  // ========================

  private addMessage(text: string, type: 'sent' | 'received') {
    const msg = this.renderer.createElement('div');
    msg.classList.add('message', type);
    msg.textContent = text;
    this.renderer.appendChild(this.chatBody, msg);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

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

  private showTyping(callback: () => void) {
    const typing = this.renderer.createElement('div');
    typing.classList.add('message', 'received');
    typing.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span>`;
    this.renderer.appendChild(this.chatBody, typing);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
    setTimeout(() => {
      typing.remove();
      callback();
    }, 800);
  }
}
