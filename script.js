const pantalla = document.querySelector("#miCanvas");
const pincel = pantalla.getContext("2d");

const radio = 20;
let xAleatorio, yAleatorio;

function dibujarCirculo(x, y, radio, color) {
    pincel.fillStyle = color;
    pincel.beginPath();
    pincel.arc(x, y, radio, 0, 2 * Math.PI);
    pincel.fill();
}

function limpiarPantalla() {
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
}

function dibujarObjetivo(x, y) {
    dibujarCirculo(x, y, radio + 10, "#ff4d6d"); // círculo más grande
    dibujarCirculo(x, y, radio, "#ffffff");     // círculo blanco medio
    dibujarCirculo(x, y, radio - 5, "#ff4d6d");  // círculo pequeño
}

function sortearPosicion(maximo) {
    return Math.floor(Math.random() * maximo);
}

function actualizarPantalla() {
    limpiarPantalla();
    xAleatorio = sortearPosicion(pantalla.width);
    yAleatorio = sortearPosicion(pantalla.height);
    dibujarObjetivo(xAleatorio, yAleatorio);
}

setInterval(actualizarPantalla, 1000);

function disparar(evento) {
    const rect = pantalla.getBoundingClientRect();
    const x = evento.clientX - rect.left;
    const y = evento.clientY - rect.top;

    if (
        x > xAleatorio - radio &&
        x < xAleatorio + radio &&
        y > yAleatorio - radio &&
        y < yAleatorio + radio
    ) {
        confeti();
        setTimeout(() => {
            alert("¡Te encontré sin siquiera buscarte, pero eres la casualidad más bonita que tengo en vida! ❤️🎯");
        }, 100);
    }
}

pantalla.addEventListener('click', disparar);

// Efecto visual de "confeti" básico
function confeti() {
    for (let i = 0; i < 30; i++) {
        dibujarCirculo(
            sortearPosicion(pantalla.width),
            sortearPosicion(pantalla.height),
            5,
            `hsl(${Math.random() * 360}, 100%, 70%)`
        );
    }
}
