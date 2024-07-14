// Diego Lopez 10-07-2024 //
// 1 //
const convertirAlturaAMetros = (alturaCm) => alturaCm / 100;
// Función para calcular el IMC
const calcularIMC = (altura, peso) => peso / (altura * altura);
// Función para mostrar el resultado
const mostrarResultado = (resultado) => {
    document.getElementById('resultado').value = resultado.toFixed(1);
};
// Función principal que coordina el cálculo del IMC
const procesarCalculoIMC = () => {
    const alturaCm = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const alturaMetros = convertirAlturaAMetros(alturaCm);
    const imc = calcularIMC(alturaMetros, peso);
    mostrarResultado(imc);
};
// Agregar evento al botón
document.getElementById('calcularBtn').addEventListener('click', procesarCalculoIMC);

// Conversion de Divisa //

const tipoCambio = 18; // 1 dólar = 18 pesos mexicanos
// Función para convertir de pesos a dólares
const convertirPesosADolares = (pesos) => pesos / tipoCambio;
// Función para convertir de dólares a pesos
const convertirDolaresAPesos = (dolares) => dolares * tipoCambio;
// Función para actualizar el valor en el otro input
const actualizarValor = (inputId, valorConvertido) => {
    document.getElementById(inputId).value = valorConvertido.toFixed(2);
};
// Función principal para manejar el cambio de valor en los inputs
const manejarCambio = (inputId, conversionFn, resultadoId) => {
    const valor = parseFloat(document.getElementById(inputId).value);
    if (!isNaN(valor)) {
        const valorConvertido = conversionFn(valor);
        actualizarValor(resultadoId, valorConvertido);
    }
};
// Agregar eventos a los inputs
document.getElementById('pesosMexicano').addEventListener('input', () => {
    manejarCambio('pesosMexicano', convertirPesosADolares, 'dolarEstadounidense');
});
document.getElementById('dolarEstadounidense').addEventListener('input', () => {
    manejarCambio('dolarEstadounidense', convertirDolaresAPesos, 'pesosMexicano');
});
// Valores por defecto
document.getElementById('pesosMexicano').value = 18;
document.getElementById('dolarEstadounidense').value = 1;

// Notepad con filros//

let notas = [
    { id: 1, 
      titulo: "Sacar la basura", 
      texto: "mi mamá me va a retar si no lo hago", 
      realizada: false },

    { id: 2, 
      titulo: "Nota 2", 
      texto: "Texto de la nota 2", 
      realizada: true }
];
let idGlobal = notas.length;

const notasContainer = document.getElementById('notas-container');

const pintarNotas = (notasArray) => {
    notasContainer.innerHTML = '';
    if (notasArray.length === 0) {
        notasContainer.innerHTML = '<div class="col-12 text-center">NO HAY NOTAS PARA MOSTRAR</div>';
        return;
    }
    notasArray.forEach(nota => {
        const notaDiv = document.createElement('div');
        notaDiv.className = 'mb-2 p-0 h-100';
        notaDiv.innerHTML = `
            <div class="card mx-1 p-2">
                <div class="card-body">
                    <h5 class="card-title text-center">${nota.titulo}</h5>
                    <p class="card-text text-center">${nota.texto}</p>
                    <button class="btn btn-danger p-2 my-2" onclick="borrarNota(${nota.id})">Borrar Nota</button>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" onclick="marcarRealizada(${nota.id})" ${nota.realizada ? 'checked' : ''}>
                        <label class="form-check-label">Realizada</label>
                    </div>
                </div>
            </div>
        `;
        notasContainer.appendChild(notaDiv);
    });
}

const agregarNota = () => {
    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;
    if (titulo === '' || texto === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }
    const nuevaNota = { id: ++idGlobal, titulo, texto, realizada: false };
    notas.push(nuevaNota);
    pintarNotas(notas);
    limpiarCampos();
}

const borrarNota = (id) => {
    notas = notas.filter(nota => nota.id !== id);
    pintarNotas(notas);
}

const marcarRealizada = (id) => {
    const nota = notas.find(nota => nota.id === id);
    nota.realizada = !nota.realizada;
    pintarNotas(notas);
}

const limpiarCampos = () => {
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
}

const filtrarNotas = () => {
    const texto = document.getElementById('filtro-texto').value.toLowerCase();
    const realizadas = document.getElementById('filtro-realizadas').checked;
    let notasFiltradas = notas;

    if (texto) {
        notasFiltradas = notasFiltradas.filter(nota => 
            nota.titulo.toLowerCase().includes(texto) || 
            nota.texto.toLowerCase().includes(texto)
        );
    }

    if (realizadas) {
        notasFiltradas = notasFiltradas.filter(nota => nota.realizada);
    }

    pintarNotas(notasFiltradas);
}

// Inicializar con notas de prueba
pintarNotas(notas);
