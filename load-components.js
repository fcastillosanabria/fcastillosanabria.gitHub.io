// ===============================
// Función para cargar un componente HTML
// ===============================
function loadComponent(selector, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Error al cargar ${file}: ${response.statusText}`);
      return response.text();
    })
    .then(data => {
      document.querySelector(selector).innerHTML = data;

      // Si es el footer, actualiza el año automáticamente
      if (selector === '#footer') {
        const yearSpan = document.getElementById('copyright-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
      }

      // Ejecutar callback si existe (ej. inicializar chatbot)
      if (callback) callback();
    })
    .catch(error => console.error(error));
}

// ===============================
// Cargar los componentes
// ===============================
loadComponent('#header', 'componentes/header.html');
loadComponent('#footer', 'componentes/footer.html');
loadComponent('#socialMedia', 'componentes/socialMedia.html');

// ✅ Cargar chatbot y luego inicializarlo
loadComponent('#chatbot', 'componentes/chatbot.html', initChatbot);

// ===============================
// Inicializar chatbot personal profesional
// ===============================
function initChatbot() {
  const chatBtn = document.getElementById("whatsappBtn");
  const chatWindow = document.getElementById("whatsappChat");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");
  const chatBody = document.getElementById("chatBody");

  if (!chatBtn || !chatWindow) {
    console.error("❌ No se encontró el componente del chatbot.");
    return;
  }

  // 👉 Abrir / Cerrar chat
  chatBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("d-none");
  });

  closeChat.addEventListener("click", () => {
    chatWindow.classList.add("d-none");
  });

  // 👉 Enviar mensaje
  sendBtn.addEventListener("click", handleUserInput);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserInput();
  });

  chatInput.addEventListener("focus", () => {
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 300);
  });

  // ===============================
  // 💬 FUNCIONALIDAD DEL CHATBOT
  // ===============================

  let currentStep = "menu"; // controla en qué parte está el bot

  // 🟢 Saludo inicial y menú secuencial
  setTimeout(() => {
    showMessagesSequentially([
      "👋 ¡Hola! Soy el asistente virtual de Francis.",
      "¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo"
    ]);
  });


  // Función para procesar entradas del usuario
  function handleUserInput() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "sent");
    chatInput.value = "";

    // Esperar un momento para la respuesta
    setTimeout(() => {
      processUserResponse(text);
    }, 700);
  }

  // Lógica del bot según el paso actual
  function processUserResponse(input) {
    if (currentStep === "menu") {
      switch (input) {
        case "1":
          showMessagesSequentially([
            "🧑‍💼 Francis es un joven profesional apasionado por la tecnología...",
            "Le interesa crear soluciones digitales...",
            "¿Deseas volver al menú principal? (sí/no)"
          ], () => {
            currentStep = "volverMenu";
          });
          break;

        case "2":
          showMessagesSequentially([
            "💡 Francis domina HTML, CSS, JavaScript y Bootstrap. También trabaja con bases de datos y desarrollo de apps con QR como *QTravel UNDC*.",
            "Además, tiene conocimientos en redacción académica y proyectos de investigación.",
            "¿Deseas volver al menú principal? (sí/no)"
          ], () => {
            currentStep = "volverMenu";
          });
          break;

        case "3":
          showMessagesSequentially([
            "🎓 Estudió en el IESTP Valle Grande la carrera de Análisis de Sistemas, realizó varios proyectos en entorno real de trabajo. Actualmente cursa estudios en la Universidad Nacional de Cañete (UNDC), donde ha participado en proyectos relacionados con el turismo, la tecnología y el desarrollo local.",
            "Tiene experiencia en la creación de aplicaciones, documentación técnica y diseño web responsive.",
            "¿Deseas volver al menú principal? (sí/no)"
          ], () => {
            currentStep = "volverMenu";
          });
          break;

        case "4":
          showMessagesSequentially([
            "📬 Puedes contactar directamente a Francis a través de su correo: fcastillosanabria@gmail.com, número de celular: +51 934179705.",
            "¿Deseas volver al menú principal? (sí/no)"
          ], () => {
            currentStep = "volverMenu";
          });
          break;

        default:
          showTyping(() => {
            addMessage("⚠️ Por favor, elige una opción válida (1, 2, 3 o 4).", "received");
          });
      }
    }
    else if (currentStep === "volverMenu") {
      if (input.toLowerCase() === "sí" || input.toLowerCase() === "si") {
        showTyping(() => {
          addMessage(
            "¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo",
            "received"
          );
          currentStep = "menu";
        });
      } else {
        showTyping(() => {
          addMessage("✨ ¡Gracias por tu interés en conocer a Francis! Si deseas volver a empezar, escribe 'hola'.", "received");
          currentStep = "final";
        });
      }
    }
    else if (currentStep === "final" && input.toLowerCase() === "hola") {
      showTyping(() => {
        addMessage(
          "¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo",
          "received"
        );
        currentStep = "menu";
      });
    }
  }

// Añadir mensajes al chat
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);

  // Si el mensaje es del usuario
  if (type === "sent") {
    msg.innerHTML = `
  <div class="message-content">
    <span class="message-text">${text.trim()}</span>
    <span class="checkmarks">
      <i class="bi bi-check2-all"></i>
    </span>
  </div>
`;


    // Primero palomitas grises, luego azules tras un breve tiempo
    setTimeout(() => {
      const checks = msg.querySelectorAll(".checkmarks i");
      checks.forEach(i => i.classList.add("blue"));
    }, 500); // medio segundo después, cambia a azul
  } 
  // Si el mensaje es del bot
  else {
    msg.innerText = text.trim();
  }

  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
  setStatusOnline();
}


  // ✅ NUEVA FUNCIÓN: mostrar mensajes secuenciales con animación individual
  function showMessagesSequentially(messages, callback) {
    let index = 0;

    function next() {
      if (index >= messages.length) {
        if (callback) callback();
        return;
      }

      // Mostrar animación de escritura antes de cada mensaje
      showTyping(() => {
        addMessage(messages[index], "received");
        index++;
        setTimeout(next, 100); // pequeña pausa entre mensajes
      });
    }

    next();
  }

  // Animación de "escribiendo..." y estado
  function showTyping(callback) {
    setStatusTyping();

    const typingMsg = document.createElement("div");
    typingMsg.classList.add("message", "received");
    typingMsg.innerHTML = `
    <span class="typing-dots">
      <span></span><span></span><span></span>
    </span>
  `;
    chatBody.appendChild(typingMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      typingMsg.remove();
      if (callback) callback();
    }, 1000); // 2 segundos de animación antes del mensaje
  }



  // Cambia estado a "escribiendo..."
  function setStatusTyping() {
    const status = document.querySelector("#whatsappChat .card-header small");
    if (status) status.textContent = "Typing...";
  }
  // Cambia estado a "En línea"
  function setStatusOnline() {
    const status = document.querySelector("#whatsappChat .card-header small");
    if (status) status.textContent = "Online ";
  }

  // Estilos para animación de puntos
  if (!document.getElementById('typing-dots-style')) {
    const style = document.createElement('style');
    style.id = 'typing-dots-style';
    style.textContent = `
      .typing-dots {
        display: inline-block;
        font-size: 18px;
        letter-spacing: 2px;
        animation: none;
      }
      .typing-dots span {
        opacity: 0.3;
        animation: blink 1s infinite;
      }
      .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }
      .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }
      @keyframes blink {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
}