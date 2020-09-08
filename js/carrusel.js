var indiceCarrusel = 0;
var cantidadSlides = -1;
var photos = []

const mod = (n, m) => ((n % m) + m) % m;

const nextFoto = () => {
    updateSlide(indiceCarrusel, indiceCarrusel + 1);
}

const prevFoto = () => {
    updateSlide(indiceCarrusel, indiceCarrusel - 1);
}

const updateSlide = (anterior, n) => {
    indiceCarrusel = mod(n, cantidadSlides);
    //Eliminar clase active de foto actual
    photos[anterior].style.display = 'none';
    //Añadir clase active a foto actual
    photos[indiceCarrusel].style.display = 'inline-block';
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
    // Agregar eventos
    let navLeft = carrusel.getElementsByClassName("carousel__control--left");
    navLeft[0].addEventListener('click', () => prevFoto());
    let navRight = carrusel.getElementsByClassName("carousel__control--right");
    navRight[0].addEventListener('click', () => nextFoto());
    return carrusel;
}