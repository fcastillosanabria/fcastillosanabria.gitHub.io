// Función para cargar un componente HTML
function loadComponent(selector, file) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Error al cargar ${file}: ${response.statusText}`);
        return response.text();
      })
      .then(data => {
        document.querySelector(selector).innerHTML = data;
      })
      .catch(error => console.error(error));
  }
  
  // Cargar el header y el footer
  loadComponent('#header', 'componentes/header.html');
  loadComponent('#footer', 'componentes/footer.html');
  