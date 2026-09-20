import { QuizQuestion } from '../types';

export const matrixQuiz: QuizQuestion[] = [
  {
    id: 'mat-1',
    question: 'Si tenemos dos matrices A y B, ¿cuál es el requisito obligatorio para poder sumarlas (A + B)?',
    options: [
      'Que ambas sean matrices cuadradas (ej. 2x2, 3x3).',
      'Que tengan exactamente la misma cantidad de filas y la misma cantidad de columnas.',
      'Que las columnas de A sean iguales a las filas de B.',
      'Que todos los números dentro sean positivos.'
    ],
    correctIndex: 1,
    explanation: '¡Exacto! Para sumar matrices se suman elemento a elemento en la misma posición (A[i][j] + B[i][j]), por lo que sus dimensiones deben ser idénticas.',
    hint: 'Piensa en cómo sumas las casillas correspondientes una por una.'
  },
  {
    id: 'mat-2',
    question: 'Para multiplicar dos matrices A (de tamaño 3 x 2) y B (de tamaño 2 x 4), ¿se puede realizar la multiplicación clásica?',
    options: [
      'Sí, porque el número de columnas de A (2) coincide con el número de filas de B (2). El resultado será 3 x 4.',
      'No, porque no son del mismo tamaño.',
      'Sí, pero el resultado será de tamaño 2 x 2.',
      'Solo se puede si multiplicamos elemento a elemento.'
    ],
    correctIndex: 0,
    explanation: '¡Excelente Fabrix! En el producto matricial, las columnas de la primera matriz deben ser iguales a las filas de la segunda. La matriz resultante hereda las filas de A y las columnas de B (3 x 4).',
    hint: 'La regla de oro es: (m x k) multiplicado por (k x n) da una matriz de (m x n).'
  },
  {
    id: 'mat-3',
    question: 'En programación (tanto en Python como en JavaScript), ¿cuál es el índice de la primera celda en la esquina superior izquierda de una matriz?',
    options: [
      'matriz[1][1]',
      'matriz[0][0]',
      'matriz(1, 1)',
      'matriz[fila_1, col_1]'
    ],
    correctIndex: 1,
    explanation: '¡Correcto! En la mayoría de lenguajes como Python y JS, los índices comienzan en 0 (base cero). Por eso la primera celda es [0][0].',
    hint: 'Recuerda que en computación empezamos a contar desde el 0.'
  },
  {
    id: 'mat-4',
    question: '¿Cuál es la diferencia entre el producto matricial real y el producto de Hadamard?',
    options: [
      'Son exactamente lo mismo.',
      'El de Hadamard multiplica celda por celda idéntica (A[i][j] * B[i][j]), mientras el matricial hace sumas de productos de filas por columnas.',
      'El de Hadamard solo funciona con números negativos.',
      'El producto matricial no existe en matemáticas.'
    ],
    correctIndex: 1,
    explanation: '¡Muy bien! El producto matricial real (el que te enseñan en álgebra y computación) multiplica la fila i por la columna j y suma los resultados. Hadamard es la simple multiplicación directa celda por celda.',
    hint: 'El producto clásico hace el "producto punto" fila por columna.'
  }
];

export const sortingQuiz: QuizQuestion[] = [
  {
    id: 'sort-1',
    question: '¿Con qué analogía de la vida real se compara comúnmente el algoritmo de ordenamiento por Inserción?',
    options: [
      'Con buscar una palabra en el diccionario mediante saltos a la mitad.',
      'Con acomodar una baraja de cartas en la mano una por una en su lugar.',
      'Con hacer burbujas en un refresco que suben a la superficie.',
      'Con revolver piezas de dominó sobre la mesa aleatoriamente.'
    ],
    correctIndex: 1,
    explanation: '¡Muy bien Fabrix! Imagina que tomas una carta nueva (la "clave" o key) y la vas comparando hacia la izquierda hasta encontrar su lugar correcto entre las que ya tienes ordenadas.',
    hint: 'Piensa en las cartas de juego en tus manos.'
  },
  {
    id: 'sort-2',
    question: 'Durante la ejecución del algoritmo de Inserción, ¿por qué el ciclo externo empieza en el índice i = 1 en vez de i = 0?',
    options: [
      'Porque el índice 0 no existe.',
      'Porque un vector de un solo elemento (el que está en el índice 0) ya se considera trivialmente ordenado.',
      'Por un error de sintaxis en Python.',
      'Porque se ignora el primer número para que sea más rápido.'
    ],
    correctIndex: 1,
    explanation: '¡Correcto! El sub-arreglo con solo el primer elemento ([vector[0]]) ya está ordenado por sí mismo. Empezamos tomando el segundo elemento (índice 1) para insertarlo respecto al primero.',
    hint: 'Si tienes solo 1 carta en la mano, ¿ya está ordenada?'
  },
  {
    id: 'sort-3',
    question: '¿Qué hace la variable temporal "clave" (o key) en cada iteración?',
    options: [
      'Guarda una copia del valor actual a ordenar para que no se sobreescriba mientras los demás elementos se desplazan a la derecha.',
      'Cuenta cuántos números impares hay.',
      'Bloquea el vector para que no se pueda modificar.',
      'Guarda el valor más grande de todo el arreglo.'
    ],
    correctIndex: 0,
    explanation: '¡Exacto! Al desplazar los números mayores hacia la derecha (vector[j+1] = vector[j]), sobreescribimos la posición. Guardar la "clave" al inicio nos permite pegarla luego en el espacio libre.',
    hint: 'Si mueves muebles a un espacio, necesitas levantar el objeto que estaba ahí para no aplastarlo.'
  },
  {
    id: 'sort-4',
    question: '¿Cuál es la gran ventaja de Inserción frente al algoritmo de Selección cuando una lista ya está casi ordenada?',
    options: [
      'Inserción solo necesita O(n) operaciones porque casi no desplaza elementos, mientras Selección siempre busca el mínimo en toda la lista.',
      'Ninguna, Selección siempre es el doble de rápido.',
      'Inserción usa inteligencia artificial.',
      'Selección no funciona con listas impares.'
    ],
    correctIndex: 0,
    explanation: '¡Brillante! Inserción es adaptativo: si el vector ya viene ordenado, el bucle while se detiene de inmediato (0 desplazamientos), logrando tiempo lineal O(n).',
    hint: 'Recuerda que si el elemento ya es mayor al anterior, el ciclo while se detiene al instante.'
  }
];

export const stackQuiz: QuizQuestion[] = [
  {
    id: 'stack-1',
    question: '¿Qué significan las siglas LIFO en una Pila (Stack)?',
    options: [
      'Long Input, Fast Output (Entrada Larga, Salida Rápida).',
      'Last-In, First-Out (El último en entrar es el primero en salir).',
      'List In, File Out (Lista Adentro, Archivo Afuera).',
      'Loop Iteration For Objects.'
    ],
    correctIndex: 1,
    explanation: '¡Correcto! LIFO significa Last-In, First-Out. Imagina una pila de platos para lavar: el último plato que pones arriba de la pila es el primero que tomas para lavar.',
    hint: 'Piensa en una pila de platos o una caja de resortes.'
  },
  {
    id: 'stack-2',
    question: '¿Cuál es la diferencia fundamental entre la operación "pop()" y la operación "top()"?',
    options: [
      'No hay diferencia, ambas hacen lo mismo.',
      '"pop()" extrae y elimina el elemento superior de la pila, mientras que "top()" solo consulta su valor sin eliminarlo.',
      '"top()" borra todos los elementos de la pila.',
      '"pop()" solo funciona con números pares.'
    ],
    correctIndex: 1,
    explanation: '¡Exacto! pop() quita el elemento de la cima y reduce el tamaño de la pila. top() es una simple "mirada" al elemento de arriba sin tocar ni modificar la estructura.',
    hint: 'Top = Cima (mirar). Pop = Sacar y quitar.'
  },
  {
    id: 'stack-3',
    question: 'En la pila MANUAL de Fabrix (arreglo fijo + puntero tope), ¿por qué se usan las guardias `if tope >= 0` y `if tope < MAX - 1`?',
    options: [
      'Para evitar que la computadora se apague.',
      'Para evitar UNDERFLOW (sacar/mirar con tope=-1, pila vacía) y OVERFLOW (meter con tope=9, pila llena 10/10).',
      'Porque Python no permite usar la variable tope.',
      'Son solo decorativas y no cumplen función.'
    ],
    correctIndex: 1,
    explanation: '¡Muy bien! Con arreglo fijo no hay append/pop que crezcan solos: si tope==-1 no hay casilla que leer (UNDERFLOW) y si tope==9 no hay casilla libre (OVERFLOW). Las guardias protegen al puntero antes de moverlo.',
    hint: '¿Qué pasa si intentas sacar un plato de una mesa vacía, o poner un plato 11 en un estante de 10?'
  },
  {
    id: 'stack-4',
    question: 'La pila manual tiene MAX=10 y el puntero tope. Si tope=9 (10/10 lleno) y presionas Push con el valor 50, ¿qué ocurre?',
    options: [
      'El 50 se guarda en datos[10] y la pila crece a 11 elementos.',
      'OVERFLOW: se rechaza el valor, el puntero se queda en 9 y la pila sigue con 10 elementos.',
      'El puntero vuelve a -1 y la pila se vacía.',
      'El 50 reemplaza a datos[0] automáticamente.'
    ],
    correctIndex: 1,
    explanation: '¡Correcto! Llena significa tope == MAX-1 == 9. El push manual primero pregunta `¿tope < 9?`; como es falso, muestra OVERFLOW y NO mueve el puntero ni escribe. (Y recuerda: cada push válido genera un aleatorio entre 1 y 100).',
    hint: 'Piensa en un estacionamiento de 10 lugares totalmente ocupado: el carro 11 no entra.'
  }
];

export const finalExamQuestions: QuizQuestion[] = [
  {
    id: 'final-1',
    question: 'Fabrix tiene dos matrices A (3x3) y B (3x3). Quiere calcular C = A + B. ¿Cuántas operaciones de suma elementales se realizarán en total?',
    options: ['3 sumas', '6 sumas', '9 sumas', '27 sumas'],
    correctIndex: 2,
    explanation: 'Como tiene 3 filas y 3 columnas, hay 3 * 3 = 9 celdas en total. Se realiza una suma por cada celda.',
    hint: 'Multiplica la cantidad de filas por la cantidad de columnas.'
  },
  {
    id: 'final-2',
    question: 'En el algoritmo de Inserción, si tenemos la lista [4, 7, 2, 9] y estamos en i = 2 (clave = 2), ¿cuántos elementos se desplazarán hacia la derecha?',
    options: [
      'Ninguno',
      '1 elemento (solo el 7)',
      '2 elementos (el 7 y el 4, porque ambos son mayores a 2)',
      '3 elementos'
    ],
    correctIndex: 2,
    explanation: '¡Excelente! Tanto 7 > 2 como 4 > 2, por lo que el 7 se mueve al índice 2 y el 4 al índice 1, dejando libre la posición 0 para el 2.',
    hint: 'Compara el 2 con el 7, y luego con el 4.'
  },
  {
    id: 'final-3',
    question: 'Hacemos las siguientes operaciones en una pila vacía: push(15), push(42), push(8), pop(), top(). ¿Qué valor devolverá top()?',
    options: ['8', '42', '15', 'Error, pila vacía'],
    correctIndex: 1,
    explanation: 'Rastreo: push(15) -> [15]; push(42) -> [15, 42]; push(8) -> [15, 42, 8]; pop() elimina el 8 -> queda [15, 42]; por lo tanto top() muestra 42.',
    hint: 'Sigue el orden paso a paso con lápiz y papel o en tu mente.'
  },
  {
    id: 'final-4',
    question: 'En la pila MANUAL (arreglo fijo datos[0..9] + puntero tope), ¿cómo se accede a la cima sin usar append/pop?',
    options: ['self.datos[ultimo]', 'self.datos[self.tope]', 'self.datos.top()', 'self.datos[10]'],
    correctIndex: 1,
    explanation: 'La cima siempre es datos[tope]: el puntero apunta exactamente a la última casilla ocupada. Vacía es tope==-1 y llena es tope==9. Ya no se usa pila[-1] porque el arreglo siempre tiene 10 casillas fijas.',
    hint: 'El puntero tope es el dedo que señala la cima.'
  },
  {
    id: 'final-5',
    question: '¿Por qué la complejidad temporal promedio de Insertion Sort es O(n²)?',
    options: [
      'Porque utiliza dos bucles anidados: uno para recorrer el vector y otro para buscar la posición y desplazar elementos.',
      'Porque divide el vector en dos mitades en cada paso.',
      'Porque requiere el doble de memoria RAM.',
      'Porque se ejecuta dos veces por segundo.'
    ],
    correctIndex: 0,
    explanation: 'En el peor y caso promedio, para cada uno de los n elementos (bucle externo) se pueden realizar hasta n comparaciones y desplazamientos (bucle interno), resultando en n * n = O(n²).',
    hint: 'Fíjate en el bucle `for` y en el bucle `while` que está dentro de él.'
  }
];
