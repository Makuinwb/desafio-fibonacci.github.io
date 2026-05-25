/* ═══════════════════════════════════════════════════
   FIBONACCI & NÚMEROS PRIMOS — script.js
   Algoritmos propios, sin librerías externas
   ═══════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────────
   ALGORITMO A — SERIE DE FIBONACCI
   Genera un array con los primeros n términos de la
   serie de Fibonacci usando variables simples (sin
   estructuras complejas externas).
   ────────────────────────────────────────────────── */

/**
 * Genera la secuencia de Fibonacci hasta n términos.
 * @param {number} n - Cantidad de términos (entero >= 2)
 * @returns {number[]} Array con los términos generados
 */
function generarFibonacci(n) {
  const secuencia = [];

  let a = 0;   // primer término
  let b = 1;   // segundo término
  let c;       // término auxiliar

  secuencia.push(a);
  if (n >= 2) secuencia.push(b);

  for (let i = 2; i < n; i++) {
    c = a + b;   // siguiente término = suma de los dos anteriores
    a = b;       // desplazamos: a toma el valor de b
    b = c;       // b toma el nuevo valor
    secuencia.push(c);
  }

  return secuencia;
}


/* ──────────────────────────────────────────────────
   ALGORITMO B — VERIFICACIÓN DE NÚMERO PRIMO
   Un número es primo si solo es divisible entre 1
   y sí mismo. Contamos divisores: si hay exactamente
   2, el número es primo.
   ────────────────────────────────────────────────── */

/**
 * Determina si un número entero es primo.
 * @param {number} numero - Entero positivo a verificar
 * @returns {boolean} true si es primo, false si no
 */
function esPrimo(numero) {
  if (numero < 2) return false;   // 0 y 1 no son primos por definición
  if (numero === 2) return true;  // 2 es el único primo par

  let contador = 0;

  // Contamos cuántos divisores tiene el número
  for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      contador++;
    }
  }

  // Si tiene exactamente 2 divisores (1 y sí mismo) → es primo
  return contador === 2;
}


/* ──────────────────────────────────────────────────
   ALGORITMO C — FIBONACCI PRIMOS
   Combina ambos algoritmos: genera la secuencia
   Fibonacci y filtra los que también son primos.
   ────────────────────────────────────────────────── */

/**
 * Encuentra los números de la secuencia Fibonacci
 * que también son números primos.
 * @param {number[]} secuencia - Array de Fibonacci
 * @returns {number[]} Subarray de Fibonacci primos
 */
function filtrarFibonacciPrimos(secuencia) {
  const primos = [];
  for (let i = 0; i < secuencia.length; i++) {
    if (esPrimo(secuencia[i])) {
      primos.push(secuencia[i]);
    }
  }
  return primos;
}


/* ──────────────────────────────────────────────────
   UTILIDADES DOM
   ────────────────────────────────────────────────── */

/**
 * Muestra un mensaje de error en el panel de resultados.
 * @param {string} mensaje - Texto del error a mostrar
 */
function mostrarError(mensaje) {
  // Ocultamos otros estados
  document.getElementById("result-empty").style.display   = "none";
  document.getElementById("result-content").style.display = "none";

  // Mostramos el bloque de error
  const errorDiv = document.getElementById("result-error");
  errorDiv.style.display = "block";
  errorDiv.innerHTML = `
    <div class="result-error__icon">⚠️</div>
    <p class="result-error__msg">${mensaje}</p>
  `;
}

/**
 * Restablece el panel de resultados al estado vacío inicial.
 */
function limpiarSimulador() {
  // Limpiamos el input
  document.getElementById("terminos").value = "";
  document.getElementById("modo").value = "todos";

  // Restauramos el estado vacío
  document.getElementById("result-empty").style.display   = "flex";
  document.getElementById("result-content").style.display = "none";
  document.getElementById("result-error").style.display   = "none";
  document.getElementById("result-error").innerHTML        = "";
}


/* ──────────────────────────────────────────────────
   FUNCIÓN PRINCIPAL — EJECUTAR SIMULADOR
   ────────────────────────────────────────────────── */

function ejecutarSimulador() {

  /* ── 1. Captura de datos con document.getElementById ── */
  const valorTerminos = document.getElementById("terminos").value;
  const modoVista     = document.getElementById("modo").value;

  /* ── 2. Validación: campo vacío ── */
  if (valorTerminos === "") {
    mostrarError("Por favor, ingresa la cantidad de términos antes de analizar.");
    return;
  }

  /* ── 3. Conversión y validaciones de rango ── */
  const n = parseInt(valorTerminos, 10);

  if (isNaN(n)) {
    mostrarError("El valor ingresado no es un número válido.");
    return;
  }
  if (n < 2) {
    mostrarError("Ingresa al menos 2 términos para generar la secuencia.");
    return;
  }
  if (n > 70) {
    mostrarError("El máximo permitido es 70 términos para evitar desbordamiento numérico.");
    return;
  }

  /* ── 4. CÁLCULOS PRINCIPALES ── */
  const secuencia      = generarFibonacci(n);               // Algoritmo A
  const fibPrimos      = filtrarFibonacciPrimos(secuencia); // Algoritmos A + B
  const totalTerminos  = secuencia.length;
  const totalPrimos    = fibPrimos.length;
  const porcentaje     = ((totalPrimos / totalTerminos) * 100).toFixed(1);

  /* ── 5. Determinar qué números mostrar según modo ── */
  const mostrar = modoVista === "soloprimos"
    ? secuencia.filter(num => esPrimo(num))
    : secuencia;

  /* ── 6. RENDERIZAR RESUMEN ── */
  document.getElementById("result-summary").innerHTML = `
    <div class="summary-chip">
      <span class="summary-chip__val">${totalTerminos}</span>
      <span class="summary-chip__label">Términos</span>
    </div>
    <div class="summary-chip summary-chip--prime">
      <span class="summary-chip__val">${totalPrimos}</span>
      <span class="summary-chip__label">Fibonacci primos</span>
    </div>
    <div class="summary-chip summary-chip--pct">
      <span class="summary-chip__val">${porcentaje}%</span>
      <span class="summary-chip__label">Son primos</span>
    </div>
  `;

  /* ── 7. RENDERIZAR CHIPS DE SECUENCIA ── */
  let chipsHTML = "";
  for (let i = 0; i < mostrar.length; i++) {
    const num    = mostrar[i];
    const esPrim = esPrimo(num);
    const clase  = esPrim ? "chip chip--primo" : "chip chip--normal";
    const delay  = (i * 30) + "ms";  // animación escalonada
    chipsHTML += `<span class="${clase}" style="animation-delay:${delay}" title="${esPrim ? "¡Primo!" : "No primo"}">${num}</span>`;
  }
  document.getElementById("result-sequence").innerHTML = chipsHTML;

  /* ── 8. RENDERIZAR LISTA DE PRIMOS ── */
  let primosList = "";
  if (fibPrimos.length === 0) {
    primosList = `
      <p class="primos-list-title">Fibonacci primos encontrados</p>
      <p class="primos-count">Ninguno en este rango.</p>
    `;
  } else {
    primosList = `
      <p class="primos-list-title">Fibonacci primos encontrados</p>
      <p class="primos-list-nums">${fibPrimos.join(" · ")}</p>
      <p class="primos-count">${fibPrimos.length} número${fibPrimos.length > 1 ? "s" : ""} que son a la vez Fibonacci y primo${fibPrimos.length > 1 ? "s" : ""}.</p>
    `;
  }
  document.getElementById("result-primos-list").innerHTML = primosList;

  /* ── 9. Mostrar panel de resultados ── */
  document.getElementById("result-empty").style.display   = "none";
  document.getElementById("result-error").style.display   = "none";
  document.getElementById("result-content").style.display = "block";
}
