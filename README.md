# Fibonacci y Números Primos en Seguridad Matemática

Una página web interactiva que combina la serie de Fibonacci con la verificación de números primos para explorar un problema real: la detección de números especiales usados en criptografía.

---

## Estructura del proyecto

Tengo tres archivos principales organizados así:

```
desafio-fibonacci-primos/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
└── README.md
```

Una carpeta `css` para los estilos, una carpeta `js` para la lógica, y el `index.html` en la raíz.

---

## El problema que elegí

Elegí el caso combinado: generar la serie de Fibonacci y detectar cuáles de sus números también son primos. Los llamo "Fibonacci primos" y tienen una aplicación real en teoría de números y criptografía.

Los números primos son la base de los algoritmos de cifrado más importantes del mundo, como RSA, que protege contraseñas, bancos y correos electrónicos. La pregunta matemática interesante es: ¿cuántos números de Fibonacci son también primos? La respuesta es: muy pocos, y encontrarlos es un problema abierto en matemáticas hasta hoy.

---

## Cómo funciona el simulador

El usuario ingresa cuántos términos de Fibonacci quiere analizar (entre 2 y 70) y puede elegir si quiere ver toda la secuencia o solo los primos. Al presionar el botón, el programa hace dos cosas:

1. Genera la secuencia de Fibonacci
2. Verifica cuáles de esos números son primos

Los resultados se muestran como chips de colores: naranja para los Fibonacci primos, crema para los que no lo son.

---

## Algoritmo A — Serie de Fibonacci

Usé variables simples con un ciclo `for`, sin arrays externos ni funciones recursivas complicadas.

```js
let a = 0, b = 1, c;

for (let i = 2; i < n; i++) {
  c = a + b;
  a = b;
  b = c;
  secuencia.push(c);
}
```

Cada número es la suma de los dos anteriores. Empiezo con 0 y 1, y el ciclo calcula el siguiente hasta llegar a los n términos pedidos.

---

## Algoritmo B — Verificación de número primo

Un número es primo si solo tiene dos divisores: 1 y sí mismo. Mi función los cuenta con un ciclo `for` y verifica que el contador sea exactamente 2.

```js
function esPrimo(numero) {
  if (numero < 2) return false;

  let contador = 0;
  for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) contador++;
  }
  return contador === 2;
}
```

No usé ninguna librería externa, todo es código propio.

---

## Captura de datos con getElementById

Para leer los valores del formulario usé `document.getElementById()` en todos los casos:

```js
const valorTerminos = document.getElementById("terminos").value;
const modoVista     = document.getElementById("modo").value;
```

Los resultados se renderizan también con `getElementById`, modificando el `innerHTML` de los contenedores.

---

## Validaciones

Antes de calcular, el programa verifica que:

- El campo no esté vacío
- El valor sea un número entero válido
- Sea al menos 2 (mínimo para generar Fibonacci)
- No supere 70 (para evitar desbordamiento en números grandes)

Si algo falla, aparece un mensaje de error claro en lugar del resultado.

---

## Diseño y responsividad

La página tiene un estilo editorial con colores oscuros en el header (verde musgo) y tonos marfil en el contenido. El acento es naranja quemado para los números primos. Usé `Cormorant Garamond` para los títulos y `Outfit` para el texto.

Para la responsividad usé CSS Grid con media queries en cuatro breakpoints:

- Computadora: dos columnas en el simulador, tres en conclusiones
- Tablet landscape: el simulador se apila en una sola columna
- Tablet portrait: todo en una columna
- Celular: tipografía más chica, espaciados compactos

---

## Tecnologías usadas

Todo el proyecto está hecho con HTML5, CSS3 y JavaScript puro. No usé ningún framework ni librería externa.

---

## Cómo probarlo

Abre el archivo `index.html` directamente en tu navegador. No necesitas servidor ni instalación. Ingresa un número de términos (por ejemplo 20) y presiona "Analizar secuencia".

Con 20 términos, los Fibonacci primos que aparecen son: 2, 3, 5, 13, 89, 233.

---

## Entregables

| | |
|---|---|
| **Repositorio Git** | github.com/usuario/desafio-fibonacci |
| **Página publicada** | usuario.github.io/desafio-fibonacci |
