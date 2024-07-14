let indiceActual = 0;
const imagenes = document.querySelectorAll('.carousel__slide img');
const totalImagenes = imagenes.length;
let intervaloCambio;

function mostrarImagenActual() {
  imagenes.forEach((img, idx) => {
    img.style.display = idx === indiceActual ? 'block' : 'none';
  });
}

function avanzarImagen() {
  indiceActual = (indiceActual + 1) % totalImagenes;
  mostrarImagenActual();
}

function retrocederImagen() {
  indiceActual = (indiceActual - 1 + totalImagenes) % totalImagenes;
  mostrarImagenActual();
}

function iniciarCarrusel() {
  mostrarImagenActual();
  intervaloCambio = setInterval(avanzarImagen, 5000);
}

function handlerEvents() {
  // Carrusel
  const btnDelante = document.getElementById('delante');
  const btnAtras = document.getElementById('atras');

  if (btnDelante && btnAtras) {
    btnDelante.addEventListener('click', function() {
      clearInterval(intervaloCambio);
      avanzarImagen();
      intervaloCambio = setInterval(avanzarImagen, 5000);
    });

    btnAtras.addEventListener('click', function() {
      clearInterval(intervaloCambio);
      retrocederImagen();
      intervaloCambio = setInterval(avanzarImagen, 5000);
    });
  } else {
    console.error('No se encontraron los botones del carrusel');
  }

  // Acordeón de Categorías
  const categoriasLinks = document.querySelectorAll('.lista-categorias a');

  categoriasLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetCategoria = document.getElementById(targetId);

      if (targetCategoria) {
        const isVisible = targetCategoria.classList.contains('visible');
        ocultarTodasLasCategorias(); // Oculta todas las categorías antes de mostrar la seleccionada

        if (!isVisible) {
          targetCategoria.classList.add('visible');
        }
      } else {
        console.error('No se encontró la categoría con ID:', targetId);
      }
    });
  });

  function ocultarTodasLasCategorias() {
    const categorias = document.querySelectorAll('.categoria');
    categorias.forEach(categoria => {
      categoria.classList.remove('visible');
    });
  }

  // Mostrar la primera categoría inicialmente
  ocultarTodasLasCategorias();
}

// Llamar a handlerEvents cuando la ventana y todos los recursos estén cargados
document.addEventListener('DOMContentLoaded', handlerEvents);

// Iniciar el carrusel al cargar la página
iniciarCarrusel();
