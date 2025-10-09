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
// Inicializar chatbot
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
  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Ajustar scroll al enfocar el input en móviles
  chatInput.addEventListener('focus', () => {
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 300); // espera a que aparezca el teclado
  });


  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "sent");
    chatInput.value = "";

    // Respuesta automática del bot
    setTimeout(() => {
      addMessage("¡Hola! Gracias por tu mensaje.", "received");
    }, 800);
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
  }

  // Mensaje inicial del bot
  addMessage("👋 Hola, ¿en qué puedo ayudarte?", "received");
}


