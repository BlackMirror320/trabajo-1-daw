/**
 * Carrusel simple de imagenes con JS Nativo
 * No esta optimizado para 2 carruseles en el misma pagina actualmente
 */

var indiceCarrusel = 0;
var cantidadSlides = -1;
var selectores = [];
var photos = []

// Funcion de modulo para valores negativos
const mod = (n, m) => ((n % m) + m) % m;

const nextFoto = (n) => {
    updateSlide(indiceCarrusel, (n != 0 ? n : indiceCarrusel + 1));
}

const prevFoto = (n) => {
    updateSlide(indiceCarrusel, (n != 0 ? n : indiceCarrusel - 1));
}

const updateSlide = (anterior, n) => {
    indiceCarrusel = mod(n, cantidadSlides);
    //Eliminar clase active de foto actual
    photos[anterior].style.display = 'none';
    //Añadir clase active a foto actual
    photos[indiceCarrusel].style.display = 'inline-block';
    setSelectorActive(anterior, indiceCarrusel);
}

/**
 * Función que actualiza los selectores del carrusel
 * @param {Number} anterior - El selector activo
 * @param {Number} n - El numero de la diapositiva a activar
 */
const setSelectorActive = (anterior, n) => {
    selectores[anterior].classList.toggle('carousel__selector--active');
    selectores[n].classList.toggle('carousel__selector--active');
}

/**
 * Añade los selectores al carrusel
 * 
 * @param {Object} selectorRoot - La raiz donde se insertarán los selectores
 * @param {Number} n - El numero de selectores a añadir
 * @param {Number} firstActive - La primera slide que estará activa
 */
const addSelectors = (selectorRoot, n, firstActive = 0) => {
    // Construccion segura del elemento selector  
    const selectorElement = document.createElement("a");
    selectorElement.classList.toggle('carousel__selector');
    selectorElement.href = '#';
 
    // Limpieza de cualquier codigo html dentro del selector raiz
    selectorRoot.innerHTML = '';

    for (let i = 0; i < n; i++) {
        let currentSelector = selectorElement.cloneNode();
        if (i == firstActive) currentSelector.classList.toggle('carousel__selector--active');
        //Añadir evento a selector
        currentSelector.addEventListener('click', () => setSelectorActive(i));
        selectorRoot.appendChild(currentSelector);
    }

    return selectorRoot.childNodes;
}

const Carrusel = (id) => {
    const carrusel = document.getElementById(id);
    photos = carrusel.getElementsByClassName("carousel__item");
    cantidadSlides = photos.length;

    // Setear el primero visible
    if (cantidadSlides > 0) {
        indiceCarrusel = 0;
        photos[0].style.display = 'inline-block';
    } else {
        console.log("El carrusel debe tener al menos 1 foto");
    }

    // Añadir Selectores
    let selectoresRoot = carrusel.getElementsByClassName("carousel__selectors")[0];
    selectores = addSelectors(selectoresRoot, cantidadSlides);

    // Agregar eventos
    // Nav izquierda y derecha
    let navLeft = carrusel.getElementsByClassName("carousel__control--left");
    navLeft[0].addEventListener('click', () => prevFoto(0));
    let navRight = carrusel.getElementsByClassName("carousel__control--right");
    navRight[0].addEventListener('click', () => nextFoto(0));

    //Selectores


    return carrusel;
}