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
  title: 'Estructura de Datos: Pila (Stack - LIFO)',
  description: 'Implementación didáctica con clase App, lista interna y 4 operaciones: Push (1-100 aleatorio), Pop, Top y Empty. LIFO: Last-In, First-Out.',
  pseudocode: `CLASE PilaApp:
  ATRIBUTOS:
    pila = ListaVacia()
    
  METODO push():
    valor = NumeroAleatorioEntre(1, 100)
    AgregarAlFinal(pila, valor)
    MOSTRAR "Elemento agregado a la cima: " + valor
    MOSTRAR "Pila: " + pila
    
  METODO pop():
    SI Longitud(pila) > 0 ENTONCES:
      valorEliminado = EliminarUltimo(pila)
      MOSTRAR "Elemento eliminado de la cima: " + valorEliminado
    SINO:
      MOSTRAR "La pila está vacía, no se puede hacer pop"
    MOSTRAR "Pila: " + pila
    
  METODO top():
    SI Longitud(pila) > 0 ENTONCES:
      valorCima = pila[UltimoIndice]
      MOSTRAR "Top (Cima actual): " + valorCima
    SINO:
      MOSTRAR "La pila está vacía (sin cima)"
      
  METODO empty():
    SI Longitud(pila) == 0 ENTONCES:
      MOSTRAR "Pila vacía"
    SINO:
      MOSTRAR "Pila no vacía (elementos: " + Longitud(pila) + ")"`,
  python: `import random
import tkinter as tk
from tkinter import messagebox

class App:
    """
    Implementación didáctica de Pila para Fabrix
    Prohibido usar módulos externos de stack: usamos lista nativa.
    """
    def __init__(self, ventana):
        self.ventana = ventana
        self.ventana.title("Pila (Stack) - Fabrix")
        self.ventana.geometry("400x250")
        self.ventana.configure(bg="#fffde7")  # Fondo lightyellow
        
        # Estructura interna de la pila (LIFO)
        self.pila = []
        
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
        
        self.label_mensaje = tk.Label(ventana, text="Listo para operar", bg="#fffde7", fg="#546e7a")
        self.label_mensaje.pack(pady=10)

    def push(self):
        valor = random.randint(1, 100)
        self.pila.append(valor)  # Agrega al final (Cima)
        self.label_estado.config(text=f"Pila: {self.pila}")
        self.label_mensaje.config(text=f"Push: Se insertó {valor} en la cima")

    def pop(self):
        if self.pila:  # Guard clause: solo si no está vacía
            valor = self.pila.pop()
            self.label_estado.config(text=f"Pila: {self.pila}")
            self.label_mensaje.config(text=f"Pop: Se eliminó {valor} de la cima")
        else:
            self.label_mensaje.config(text="Pop ignorado: La pila está vacía")

    def top(self):
        if self.pila:
            valor = self.pila[-1]  # self.pila[-1] accede al último elemento
            self.label_mensaje.config(text=f"Top: {valor}")
        else:
            self.label_mensaje.config(text="Top: Pila vacía (sin elementos)")

    def empty(self):
        if len(self.pila) == 0:
            self.label_mensaje.config(text="Estado: Pila vacía")
        else:
            self.label_mensaje.config(text=f"Estado: Pila no vacía ({len(self.pila)} elementos)")

# Para ejecutar en Python:
if __name__ == "__main__":
    raiz = tk.Tk()
    app = App(raiz)
    raiz.mainloop()`,
  javascript: `// Implementación didáctica de Stack en JavaScript puro (Vanilla JS)
class App {
  constructor() {
    // Array interno para almacenar la pila
    this.pila = [];
    
    // Obtenemos referencias del DOM
    this.label = document.getElementById("label");
    this.status = document.getElementById("status");

    // Vinculamos botones con funciones flecha
    document.getElementById("btn-push").onclick = () => this.push();
    document.getElementById("btn-pop").onclick = () => this.pop();
    document.getElementById("btn-top").onclick = () => this.top();
    document.getElementById("btn-empty").onclick = () => this.empty();

    this.actualizarUI("Pila lista para operar");
  }

  // 1) Push: Genera número aleatorio entre 1 y 100 y lo agrega a la cima
  push() {
    const valor = Math.floor(Math.random() * 100) + 1;
    this.pila.push(valor); // Añade al final (cima)
    this.actualizarUI(\`Push: Se insertó el número \${valor} en la cima.\`);
  }

  // 2) Pop: Elimina el elemento de la cima si hay elementos
  pop() {
    if (this.pila.length > 0) {
      const valor = this.pila.pop(); // Remueve el último elemento
      this.actualizarUI(\`Pop: Se eliminó el número \${valor} de la cima.\`);
    } else {
      this.actualizarUI("Pop ignorado: La pila está vacía.");
    }
  }

  // 3) Top: Muestra el valor en la cima sin eliminarlo
  top() {
    if (this.pila.length > 0) {
      const valor = this.pila[this.pila.length - 1];
      this.actualizarUI(\`Top: \${valor} (está en la cima)\`);
    } else {
      this.actualizarUI("Top: Pila vacía (no hay elementos).");
    }
  }

  // 4) Empty: Verifica si la pila no tiene elementos
  empty() {
    if (this.pila.length === 0) {
      this.actualizarUI("Pila vacía");
    } else {
      this.actualizarUI(\`Pila no vacía (tiene \${this.pila.length} elementos)\`);
    }
  }

  actualizarUI(mensaje) {
    if (this.label) {
      this.label.textContent = \`Pila: [\${this.pila.join(", ")}]\`;
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
    'En Python se usa `self.pila[-1]` para consultar la cima, mientras que en JS se accede con `this.pila[this.pila.length - 1]`.',
    'Ambos usan `pop()` para remover el último elemento y retornar su valor.',
    'Principio LIFO (Last-In, First-Out): El último elemento en entrar es el primer elemento en salir (como una pila de platos o libros).',
    'En la clase de Fabrix se pide no usar librerías externas para entender la estructura base desde un arreglo simple.'
  ]
};
