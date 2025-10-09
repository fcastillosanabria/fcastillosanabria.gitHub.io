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

  // 🟢 Primer mensaje: saludo personalizado
  setTimeout(() => {
    addMessage("👋 ¡Hola! Soy el asistente virtual de Francis.", "received");
  }, 400);

  // 🟢 Segundo mensaje: menú principal
  setTimeout(() => {
    addMessage(
      "¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo",
      "received"
    );
  }, 1000);

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
          addMessage("🧑‍💼 Francis es un joven profesional apasionado por la tecnología, el desarrollo web y la innovación educativa.", "received");
          addMessage("Le interesa crear soluciones digitales que aporten valor real a las personas.", "received");
          addMessage("¿Deseas volver al menú principal? (sí/no)", "received");
          currentStep = "volverMenu";
          break;
        case "2":
          addMessage("💡 Francis domina HTML, CSS, JavaScript y Bootstrap. También trabaja con bases de datos y desarrollo de apps con QR como *QTravel UNDC*.", "received");
          addMessage("Además, tiene conocimientos en redacción académica y proyectos de investigación.", "received");
          addMessage("¿Deseas volver al menú principal? (sí/no)", "received");
          currentStep = "volverMenu";
          break;
        case "3":
          addMessage("🎓 Estudió en el IESTP Valle Grande la carrera de Análisis de Sistemas, realizó varios proyectos en entorno real de trabajo. Actualmente cursa estudios en la Universidad Nacional de Cañete (UNDC), donde ha participado en proyectos relacionados con el turismo, la tecnología y el desarrollo local.", "received");
          addMessage("Tiene experiencia en la creación de aplicaciones, documentación técnica y diseño web responsive.", "received");
          addMessage("¿Deseas volver al menú principal? (sí/no)", "received");
          currentStep = "volverMenu";
          break;

        case "4":
          addMessage("📬 Puedes contactar directamente a Francis a través de su correo: fcastillosanabria@gmail.com, número de celular: +51 934179705.", "received");
          addMessage("¿Deseas volver al menú principal? (sí/no)", "received");
          currentStep = "volverMenu";
          break;

        default:
          addMessage("⚠️ Por favor, elige una opción válida (1, 2, 3 o 4).", "received");
      }
    }
    else if (currentStep === "volverMenu") {
      if (input.toLowerCase() === "sí" || input.toLowerCase() === "si") {
        addMessage(
          "¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo",
          "received"
        );
        currentStep = "menu";
      } else {
        addMessage("✨ ¡Gracias por tu interés en conocer a Francis! Si deseas volver a empezar, escribe 'hola'.", "received");
        currentStep = "final";
      }
    }
    else if (currentStep === "final" && input.toLowerCase() === "hola") {
      addMessage(
        "¿Qué deseas conocer sobre Francis?\n\n1️⃣ Quién es y su perfil profesional\n2️⃣ Habilidades y proyectos\n3️⃣ Experiencia y estudios\n4️⃣ Contacto directo",
        "received"
      );
      currentStep = "menu";
    }
  }

  // Añadir mensajes al chat
  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.innerText = text.trim();
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}
