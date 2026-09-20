export interface CodeExample {
  title: string;
  description: string;
  python: string;
  javascript: string;
  pseudocode: string;
  keyDifferences: string[];
}

export const matrixCode: CodeExample = {
  title: 'Manejo de Matrices (Suma y Multiplicación)',
  description: 'Creación con números aleatorios entre 1 y 10, validación de dimensiones, suma término a término y producto matricial clásico.',
  pseudocode: `ALGORITMO OperacionesConMatrices:
  // 1. Entrada de dimensiones
  LEER filasA, colsA, filasB, colsB
  
  // 2. Crear matrices con aleatorios (1 a 10)
  MatrizA = CrearMatrizAleatoria(filasA, colsA, 1, 10)
  MatrizB = CrearMatrizAleatoria(filasB, colsB, 1, 10)
  
  // 3. SUMA DE MATRICES (Requiere mismas dimensiones)
  SI filasA == filasB Y colsA == colsB ENTONCES:
    PARA i DESDE 0 HASTA filasA - 1:
      PARA j DESDE 0 HASTA colsA - 1:
        MatrizSuma[i][j] = MatrizA[i][j] + MatrizB[i][j]
  SINO:
    MOSTRAR "No se pueden sumar: dimensiones incompatibles"
  
  // 4. MULTIPLICACIÓN (Producto Punto: colsA debe ser igual a filasB)
  SI colsA == filasB ENTONCES:
    PARA i DESDE 0 HASTA filasA - 1:
      PARA j DESDE 0 HASTA colsB - 1:
        suma = 0
        PARA k DESDE 0 HASTA colsA - 1:
          suma = suma + (MatrizA[i][k] * MatrizB[k][j])
        MatrizProd[i][j] = suma
  SINO:
    MOSTRAR "No se pueden multiplicar: colsA debe ser igual a filasB"`,
  python: `import random

def crear_matriz(filas, columnas):
    """Crea una matriz con enteros aleatorios entre 1 y 10"""
    if filas <= 0 or columnas <= 0:
        raise ValueError("Las filas y columnas deben ser enteros positivos.")
    return [[random.randint(1, 10) for _ in range(columnas)] for _ in range(filas)]

def sumar_matrices(A, B):
    """Suma dos matrices si tienen las mismas dimensiones"""
    filas_a, cols_a = len(A), len(A[0])
    filas_b, cols_b = len(B), len(B[0])
    
    if filas_a != filas_b or cols_a != cols_b:
        print("Error: No se pueden sumar matrices de distinto tamaño.")
        return None
    
    # Construcción de la matriz resultante
    resultado = []
    for i in range(filas_a):
        fila = []
        for j in range(cols_a):
            fila.append(A[i][j] + B[i][j])
        resultado.append(fila)
    return resultado

def multiplicar_matrices(A, B):
    """Multiplicación matricial clásica (Producto punto fila x columna)"""
    filas_a, cols_a = len(A), len(A[0])
    filas_b, cols_b = len(B), len(B[0])
    
    if cols_a != filas_b:
        print(f"Error: Columnas de A ({cols_a}) != Filas de B ({filas_b})")
        return None
        
    resultado = []
    for i in range(filas_a):
        fila = []
        for j in range(cols_b):
            suma = 0
            for k in range(cols_a):
                suma += A[i][k] * B[k][j]
            fila.append(suma)
        resultado.append(fila)
    return resultado

# --- Demostración para Fabrix ---
try:
    filas = int(input("Ingresa cantidad de filas: "))
    columnas = int(input("Ingresa cantidad de columnas: "))
    
    A = crear_matriz(filas, columnas)
    B = crear_matriz(filas, columnas)
    
    print("\\nMatriz A:", A)
    print("Matriz B:", B)
    print("Suma A + B:", sumar_matrices(A, B))
    if filas == columnas:
        print("Producto A * B:", multiplicar_matrices(A, B))
except ValueError as e:
    print("Por favor introduce números enteros válidos.")`,
  javascript: `// Función para generar matriz con números aleatorios entre 1 y 10
function crearMatriz(filas, columnas) {
  if (filas <= 0 || columnas <= 0) {
    throw new Error("Filas y columnas deben ser enteros positivos.");
  }
  const matriz = [];
  for (let i = 0; i < filas; i++) {
    const fila = [];
    for (let j = 0; j < columnas; j++) {
      fila.push(Math.floor(Math.random() * 10) + 1);
    }
    matriz.push(fila);
  }
  return matriz;
}

// Suma de dos matrices
function sumarMatrices(A, B) {
  const filasA = A.length, colsA = A[0].length;
  const filasB = B.length, colsB = B[0].length;

  if (filasA !== filasB || colsA !== colsB) {
    console.error("Error: Dimensiones incompatibles para suma.");
    return null;
  }

  const resultado = [];
  for (let i = 0; i < filasA; i++) {
    const fila = [];
    for (let j = 0; j < colsA; j++) {
      fila.push(A[i][j] + B[i][j]);
    }
    resultado.push(fila);
  }
  return resultado;
}

// Multiplicación matricial (Producto fila x columna)
function multiplicarMatrices(A, B) {
  const filasA = A.length, colsA = A[0].length;
  const filasB = B.length, colsB = B[0].length;

  if (colsA !== filasB) {
    console.error(\`Incompatible: colsA (\${colsA}) !== filasB (\${filasB})\`);
    return null;
  }

  const resultado = [];
  for (let i = 0; i < filasA; i++) {
    const fila = [];
    for (let j = 0; j < colsB; j++) {
      let suma = 0;
      for (let k = 0; k < colsA; k++) {
        suma += A[i][k] * B[k][j];
      }
      fila.push(suma);
    }
    resultado.push(fila);
  }
  return resultado;
}

// Ejemplo de prueba:
const A = crearMatriz(2, 2);
const B = crearMatriz(2, 2);
console.table(A);
console.table(B);
console.log("Suma:", sumarMatrices(A, B));
console.log("Producto:", multiplicarMatrices(A, B));`,
  keyDifferences: [
    'Python permite crear matrices en una línea con List Comprehensions: `[[random.randint(1,10) for _ in range(c)] for _ in range(f)]`.',
    'JavaScript usa `Math.floor(Math.random() * 10) + 1` porque `Math.random()` da flotantes entre 0 y 0.999...',
    'Ambos lenguajes indexan desde 0: la primera fila y columna es `[0][0]`.',
    'Para multiplicar, no confundir el producto matricial (dot product) con la multiplicación simple celda por celda (Hadamard).'
  ]
};

export const sortingCode: CodeExample = {
  title: 'Ordenamiento por Inserción (Insertion Sort)',
  description: 'Algoritmo intuitivo similar a ordenar una baraja de cartas en la mano. Toma cada elemento y lo inserta en su lugar correcto.',
  pseudocode: `ALGORITMO OrdenamientoPorInsercion(vector):
  n = longitud(vector)
  
  // Empezamos desde el segundo elemento (índice 1)
  PARA i DESDE 1 HASTA n - 1:
    clave = vector[i]    // El elemento que queremos acomodar
    j = i - 1            // Índice del elemento anterior a la izquierda
    
    // Desplazamos a la derecha los elementos mayores que la clave
    MIENTRAS j >= 0 Y vector[j] > clave:
      vector[j + 1] = vector[j]  // Se mueve un espacio a la derecha
      j = j - 1                  // Comprobamos el siguiente a la izquierda
      
    // Insertamos la clave en su posición libre ordenada
    vector[j + 1] = clave
    
  RETORNAR vector`,
  python: `import random
import time

def insercion(vector):
    """
    Ordena una lista usando el algoritmo de inserción.
    Retorna el vector ordenado y estadísticas de pasos.
    """
    n = len(vector)
    desplazamientos = 0
    comparaciones = 0
    
    # Recorremos desde el índice 1 hasta el final
    for i in range(1, n):
        clave = vector[i]
        j = i - 1
        
        # Desplaza elementos de vector[0..i-1] que son mayores que clave
        while j >= 0:
            comparaciones += 1
            if vector[j] > clave:
                vector[j + 1] = vector[j]  # Desplazamiento a la derecha
                desplazamientos += 1
                j -= 1
            else:
                break
        
        # Inserta la clave en su posición final
        vector[j + 1] = clave
        
    return vector, comparaciones, desplazamientos

# --- Prueba para Fabrix ---
try:
    longitud = int(input("Longitud del vector a ordenar: "))
    if longitud <= 0:
        raise ValueError
    
    # Genera lista de números aleatorios entre 1 y 99
    vector_original = [random.randint(1, 99) for _ in range(longitud)]
    copia = vector_original.copy()
    
    inicio = time.perf_counter()
    ordenado, comps, shifts = insercion(copia)
    fin = time.perf_counter()
    
    print("Vector original:", vector_original)
    print("Vector ordenado:", ordenado)
    print(f"Comparaciones: {comps} | Desplazamientos: {shifts}")
    print(f"Tiempo de ejecución: {(fin - inicio)*1000:.4f} ms")
except ValueError:
    print("Error: Ingresa un número entero positivo.")`,
  javascript: `// Algoritmo de Ordenamiento por Inserción en JS
function ordenamientoInsercion(arrOriginal) {
  // Hacemos una copia para no alterar el original
  const vector = [...arrOriginal];
  const n = vector.length;
  let comparaciones = 0;
  let desplazamientos = 0;

  for (let i = 1; i < n; i++) {
    const clave = vector[i]; // El valor que vamos a insertar
    let j = i - 1;

    // Comparar y desplazar hacia la derecha
    while (j >= 0) {
      comparaciones++;
      if (vector[j] > clave) {
        vector[j + 1] = vector[j]; // Desplazamiento
        desplazamientos++;
        j--;
      } else {
        break; // Ya encontramos el lugar
      }
    }

    // Colocamos la clave en su lugar correcto
    vector[j + 1] = clave;
  }

  return { vector, comparaciones, desplazamientos };
}

// Ejemplo práctico:
const tamaño = 8;
const vectorAleatorio = Array.from({ length: tamaño }, () => 
  Math.floor(Math.random() * 99) + 1
);

console.log("Original:", vectorAleatorio);
const resultado = ordenamientoInsercion(vectorAleatorio);
console.log("Ordenado:", resultado.vector);
console.log(\`Comparaciones: \${resultado.comparaciones}, Desplazamientos: \${resultado.desplazamientos}\`);`,
  keyDifferences: [
    'En Python usamos `vector.copy()` para clonar la lista, mientras que en JS usamos el operador spread `[...arrOriginal]`.',
    'La variable `clave` (o `key`) guarda temporalmente el valor que se está insertando para no perderlo cuando los elementos se mueven a la derecha.',
    'Comparación con Burbuja y Selección: Inserción es más eficiente en arreglos casi ordenados (O(n) en el mejor de los casos), mientras Selección siempre hace O(n²) comparaciones.'
  ]
};

export const stackCode: CodeExample = {
  title: 'Pila Manual: Arreglo Fijo de 10 + Puntero tope (Sin append/pop)',
  description: 'Implementación manual con clase App: arreglo fijo de 10 casillas y puntero tope. PROHIBIDO usar append/pop/push nativos. LIFO: Last-In, First-Out.',
  pseudocode: `CLASE PilaApp:  // PILA MANUAL: arreglo fijo + puntero
  // PASO 0: Estructura fija (NO crece sola)
  ATRIBUTOS:
    MAX = 10                          // Capacidad fija: 10 casillas
    datos = ArregloDe(10, vacío)      // [ _, _, _, _, _, _, _, _, _, _ ]
    tope = -1                         // Puntero: -1 = pila vacía
    // REGLA: tope siempre apunta a la cima. Vacía=-1, llena=9 (MAX-1).

  METODO push():
    valor = NumeroAleatorioEntre(1, 100)
    // PASO 1: ¿Hay espacio? (evita OVERFLOW)
    SI tope < MAX - 1 ENTONCES:       // tope < 9
      // PASO 2: Mover el puntero ARRIBA (+1)
      tope = tope + 1
      // PASO 3: Guardar el valor en la casilla que apunta tope
      datos[tope] = valor             // SIN append/push: asignación directa
      MOSTRAR "Push: " + valor + " guardado en datos[" + tope + "]"
    SINO:
      MOSTRAR "OVERFLOW: pila llena (10/10), no cabe " + valor
    MOSTRAR "Pila: " + datos + " | tope=" + tope

  METODO pop():
    // PASO 1: ¿Hay algo que sacar? (evita UNDERFLOW)
    SI tope >= 0 ENTONCES:
      // PASO 2: Leer la cima ANTES de borrar
      valorEliminado = datos[tope]
      // PASO 3: Vaciar la casilla (higiene, queda libre)
      datos[tope] = vacío             // SIN pop(): asignación a vacío
      // PASO 4: Mover el puntero ABAJO (-1)
      tope = tope - 1
      MOSTRAR "Pop: salió " + valorEliminado + ", tope ahora=" + tope
    SINO:
      MOSTRAR "UNDERFLOW: pila vacía (tope=-1), nada que sacar"
    MOSTRAR "Pila: " + datos + " | tope=" + tope

  METODO top():
    SI tope >= 0 ENTONCES:
      valorCima = datos[tope]         // Solo LEE, no mueve el puntero
      MOSTRAR "Top: datos[" + tope + "] = " + valorCima + " (sin borrar)"
    SINO:
      MOSTRAR "La pila está vacía (tope=-1, sin cima)"

  METODO empty():
    SI tope == -1 ENTONCES:
      MOSTRAR "Pila vacía (tope=-1)"
    SINO:
      MOSTRAR "Pila no vacía (elementos: " + (tope + 1) + "/10)"`,
  python: `import random
import tkinter as tk

class App:
    """
    PILA MANUAL para Fabrix (Secundaria)
    ------------------------------------
    Estructura: arreglo FIJO de 10 casillas + puntero 'tope'.
    PROHIBIDO usar append() y pop(): todo se hace moviendo 'tope'
    y escribiendo/leyendo datos[tope] con asignación directa.

    PASO 0 - Crear la estructura:
      MAX   = 10 ................. capacidad fija, no crece
      datos = [None] * 10 ........ 10 casillas vacías [0..9]
      tope  = -1 ................. puntero: -1 = vacía, 9 = llena
    """
    MAX = 10  # Capacidad fija de la pila

    def __init__(self, ventana):
        self.ventana = ventana
        self.ventana.title("Pila Manual (10 + tope) - Fabrix")
        self.ventana.geometry("400x250")
        self.ventana.configure(bg="#fffde7")  # Fondo lightyellow

        # PASO 0: Arreglo fijo + puntero (la estructura manual)
        self.datos = [None] * self.MAX  # 10 casillas: índices 0..9
        self.tope = -1                  # Puntero: -1 = vacía

        # Etiqueta central de visualización
        self.label_estado = tk.Label(
            ventana,
            text="Pila: []",
            font=("Arial", 13, "bold"),
            bg="#fffde7",
            fg="#263238"
        )
        self.label_estado.pack(pady=20)

        # Marco para los 4 botones requeridos
        marco_botones = tk.Frame(ventana, bg="#fffde7")
        marco_botones.pack(pady=10)

        # 1. Botón Push: agrega aleatorio 1-100
        self.b1 = tk.Button(marco_botones, text="Push (1-100)", width=12, command=self.push, bg="#bbdefb")
        self.b1.grid(row=0, column=0, padx=5, pady=5)

        # 2. Botón Pop: elimina de la cima
        self.b2 = tk.Button(marco_botones, text="Pop", width=12, command=self.pop, bg="#ffcdd2")
        self.b2.grid(row=0, column=1, padx=5, pady=5)

        # 3. Botón Top: consulta el elemento superior
        self.b3 = tk.Button(marco_botones, text="Top", width=12, command=self.top, bg="#c8e6c9")
        self.b3.grid(row=1, column=0, padx=5, pady=5)

        # 4. Botón Empty: comprueba si está vacía
        self.b4 = tk.Button(marco_botones, text="Empty?", width=12, command=self.empty, bg="#ffe0b2")
        self.b4.grid(row=1, column=1, padx=5, pady=5)

        self.label_mensaje = tk.Label(ventana, text="Listo: tope=-1 (vacía)", bg="#fffde7", fg="#546e7a")
        self.label_mensaje.pack(pady=10)

    # PASO 1-3 de PUSH: comprobar, subir puntero, escribir casilla
    def push(self):
        valor = random.randint(1, 100)
        # PASO 1: ¿Hay espacio? Si tope==9 (MAX-1) => OVERFLOW (llena)
        if self.tope < self.MAX - 1:
            # PASO 2: Subir el puntero: -1->0, 0->1, ... 8->9
            self.tope = self.tope + 1
            # PASO 3: Guardar en la casilla apuntada (SIN append)
            self.datos[self.tope] = valor
            self.label_estado.config(text=f"Pila: {self.ver_pila()}")
            self.label_mensaje.config(text=f"Push: {valor} -> datos[{self.tope}] (tope={self.tope})")
        else:
            # OVERFLOW: las 10 casillas están ocupadas
            self.label_mensaje.config(text=f"OVERFLOW: llena 10/10, no cabe {valor} (tope=9)")

    # PASO 1-4 de POP: comprobar, leer, vaciar, bajar puntero
    def pop(self):
        # PASO 1: ¿Hay algo? Si tope==-1 => UNDERFLOW (vacía)
        if self.tope >= 0:
            # PASO 2: Leer la cima ANTES de borrar
            valor = self.datos[self.tope]
            # PASO 3: Vaciar la casilla (SIN pop nativo)
            self.datos[self.tope] = None
            # PASO 4: Bajar el puntero
            self.tope = self.tope - 1
            self.label_estado.config(text=f"Pila: {self.ver_pila()}")
            self.label_mensaje.config(text=f"Pop: salió {valor} (tope ahora={self.tope})")
        else:
            self.label_mensaje.config(text="UNDERFLOW: vacía (tope=-1), nada que sacar")

    def top(self):
        # Solo LEE datos[tope], NO mueve el puntero ni borra
        if self.tope >= 0:
            valor = self.datos[self.tope]  # Lectura directa por índice
            self.label_mensaje.config(text=f"Top: datos[{self.tope}] = {valor} (sin borrar)")
        else:
            self.label_mensaje.config(text="Top: vacía (tope=-1, sin cima)")

    def empty(self):
        # Vacía <=> tope == -1 | Cantidad de elementos = tope + 1
        if self.tope == -1:
            self.label_mensaje.config(text="Estado: vacía (tope=-1)")
        else:
            self.label_mensaje.config(text=f"Estado: {self.tope + 1}/10 elementos (tope={self.tope})")

    def ver_pila(self):
        # Solo muestra las casillas ocupadas: datos[0..tope]
        return [self.datos[i] for i in range(self.tope + 1)]

# Para ejecutar en Python:
if __name__ == "__main__":
    raiz = tk.Tk()
    app = App(raiz)
    raiz.mainloop()`,
  javascript: `// PILA MANUAL en JavaScript puro (Vanilla JS) — Fabrix
// Estructura: arreglo FIJO de 10 + puntero 'tope'.
// PROHIBIDO usar .push() y .pop(): solo asignación datos[tope] y tope +/- 1.
class App {
  constructor() {
    // PASO 0: Estructura fija (NO crece sola)
    this.MAX = 10;                          // Capacidad fija
    this.datos = new Array(10).fill(null);  // 10 casillas: índices 0..9
    this.tope = -1;                         // Puntero: -1 = vacía, 9 = llena

    // Obtenemos referencias del DOM
    this.label = document.getElementById("label");
    this.status = document.getElementById("status");

    // Vinculamos botones con funciones flecha
    document.getElementById("btn-push").onclick = () => this.push();
    document.getElementById("btn-pop").onclick = () => this.pop();
    document.getElementById("btn-top").onclick = () => this.top();
    document.getElementById("btn-empty").onclick = () => this.empty();

    this.actualizarUI("Lista: tope=-1 (vacía)");
  }

  // PASO 1-3 de PUSH: comprobar, subir puntero, escribir casilla
  push() {
    const valor = Math.floor(Math.random() * 100) + 1;
    // PASO 1: ¿Hay espacio? Si tope==9 => OVERFLOW
    if (this.tope < this.MAX - 1) {
      // PASO 2: Subir el puntero
      this.tope = this.tope + 1;
      // PASO 3: Guardar en la casilla apuntada (SIN .push)
      this.datos[this.tope] = valor;
      this.actualizarUI(\`Push: \${valor} -> datos[\${this.tope}] (tope=\${this.tope})\`);
    } else {
      this.actualizarUI(\`OVERFLOW: llena 10/10, no cabe \${valor} (tope=9)\`);
    }
  }

  // PASO 1-4 de POP: comprobar, leer, vaciar, bajar puntero
  pop() {
    // PASO 1: ¿Hay algo? Si tope==-1 => UNDERFLOW
    if (this.tope >= 0) {
      // PASO 2: Leer la cima ANTES de borrar
      const valor = this.datos[this.tope];
      // PASO 3: Vaciar la casilla (SIN .pop)
      this.datos[this.tope] = null;
      // PASO 4: Bajar el puntero
      this.tope = this.tope - 1;
      this.actualizarUI(\`Pop: salió \${valor} (tope ahora=\${this.tope})\`);
    } else {
      this.actualizarUI("UNDERFLOW: vacía (tope=-1), nada que sacar.");
    }
  }

  // Top: solo LEE datos[tope], no mueve el puntero
  top() {
    if (this.tope >= 0) {
      const valor = this.datos[this.tope]; // Lectura directa por índice
      this.actualizarUI(\`Top: datos[\${this.tope}] = \${valor} (sin borrar)\`);
    } else {
      this.actualizarUI("Top: vacía (tope=-1, sin cima).");
    }
  }

  // Empty: vacía <=> tope == -1. Elementos = tope + 1.
  empty() {
    if (this.tope === -1) {
      this.actualizarUI("Vacía (tope=-1)");
    } else {
      this.actualizarUI(\`No vacía: \${this.tope + 1}/10 elementos (tope=\${this.tope})\`);
    }
  }

  verPila() {
    // Solo las casillas ocupadas: datos[0..tope]
    const out = [];
    for (let i = 0; i <= this.tope; i++) out.push(this.datos[i]);
    return out;
  }

  actualizarUI(mensaje) {
    if (this.label) {
      const vals = this.verPila();
      this.label.textContent = \`Pila: [\${vals.join(", ")}] (tope=\${this.tope})\`;
    }
    if (this.status) {
      this.status.textContent = mensaje;
    }
  }
}

// Para instanciar en la página web:
window.onload = () => {
  new App();
};`,
  keyDifferences: [
    'PROHIBIDO append/pop/push nativo: en Python se usa `datos[tope] = valor` y `datos[tope] = None`; en JS `datos[tope] = valor` y `datos[tope] = null`. El tamaño nunca cambia.',
    'El puntero `tope` (-1 = vacía, 9 = llena) SIEMPRE apunta a la cima. Push hace `tope + 1` y luego escribe; pop lee, vacía y hace `tope - 1`.',
    'OVERFLOW = intentar push con tope == 9 (10/10 lleno). UNDERFLOW = intentar pop/top con tope == -1 (vacía). Ambas se detectan con `if` antes de tocar el arreglo.',
    'Cantidad de elementos = tope + 1. La cima se lee con `datos[tope]` en ambos lenguajes (Python ya NO usa `pila[-1]` porque el arreglo tiene 10 casillas fijas).'
  ]
};
