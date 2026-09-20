import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Shuffle, BarChart2, CheckCircle2, ArrowDown, Lightbulb } from 'lucide-react';
import { SortStep } from '../types';
import { sortingCode } from '../data/codeSnippets';
import { sortingQuiz } from '../data/quizData';
import { FlowchartSVG } from './FlowchartSVG';
import { CodeViewer } from './CodeViewer';
import { QuizCard } from './QuizCard';

export const SortingTopic: React.FC = () => {
  const [arraySize, setArraySize] = useState<number>(7);
  const [customInput, setCustomInput] = useState<string>('');
  const [initialArray, setInitialArray] = useState<number[]>([45, 12, 89, 34, 7, 23, 61]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(900);

  // Generate random array
  const generateRandomArray = (size: number) => {
    const validSize = Math.max(3, Math.min(10, size));
    return Array.from({ length: validSize }, () => Math.floor(Math.random() * 95) + 5);
  };

  const handleRegenerate = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    const newArr = generateRandomArray(arraySize);
    setInitialArray(newArr);
    setCustomInput(newArr.join(', '));
  };

  const handleApplyCustom = () => {
    try {
      const parts = customInput.split(',').map((p) => parseInt(p.trim())).filter((n) => !isNaN(n));
      if (parts.length >= 3 && parts.length <= 12) {
        setIsPlaying(false);
        setCurrentStepIndex(0);
        setInitialArray(parts);
        setArraySize(parts.length);
      } else {
        alert('Por favor ingresa entre 3 y 12 números separados por comas.');
      }
    } catch {
      alert('Formato inválido. Ejemplo: 34, 12, 89, 5, 20');
    }
  };

  // Pre-calculate all steps of Insertion Sort
  const steps: SortStep[] = useMemo(() => {
    const arr = [...initialArray];
    const n = arr.length;
    const generatedSteps: SortStep[] = [];
    let stepCount = 0;

    // Initial state
    generatedSteps.push({
      stepIndex: stepCount++,
      array: [...arr],
      i: 1,
      j: 0,
      key: arr[1] ?? 0,
      action: 'select-key',
      description: `Iniciamos el algoritmo. El sub-arreglo [${arr[0]}] ya se considera ordenado. Empezamos en el índice i = 1 para insertar arr[1].`,
      sortedUpTo: 0,
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      // Select key
      generatedSteps.push({
        stepIndex: stepCount++,
        array: [...arr],
        i,
        j,
        key,
        action: 'select-key',
        description: `Iteración i = ${i}: Tomamos la "clave" (carta en mano) = ${key}. Buscaremos su lugar correcto comparando hacia la izquierda.`,
        sortedUpTo: i - 1,
      });

      // While loop
      while (j >= 0) {
        // Comparison step
        generatedSteps.push({
          stepIndex: stepCount++,
          array: [...arr],
          i,
          j,
          key,
          action: 'compare',
          description: `¿Es arr[${j}] (${arr[j]}) mayor que la clave (${key})? ${
            arr[j] > key ? 'SÍ: Debemos desplazar el ' + arr[j] + ' hacia la derecha.' : 'NO: La clave es mayor o igual. Hemos encontrado la posición correcta.'
          }`,
          sortedUpTo: i - 1,
          comparingIndices: [j, j + 1],
        });

        if (arr[j] > key) {
          arr[j + 1] = arr[j]; // shift right
          generatedSteps.push({
            stepIndex: stepCount++,
            array: [...arr],
            i,
            j,
            key,
            action: 'shift',
            description: `Desplazamos el ${arr[j]} al índice ${j + 1}. El puntero j retrocede a ${j - 1}.`,
            sortedUpTo: i - 1,
          });
          j = j - 1;
        } else {
          break;
        }
      }

      // Insert key
      arr[j + 1] = key;
      generatedSteps.push({
        stepIndex: stepCount++,
        array: [...arr],
        i,
        j: j + 1,
        key,
        action: 'insert',
        description: `Insertamos la clave (${key}) en el índice libre ${j + 1}. El sub-arreglo [0..${i}] ahora está 100% ordenado.`,
        sortedUpTo: i,
      });
    }

    // Final Done
    generatedSteps.push({
      stepIndex: stepCount++,
      array: [...arr],
      i: n,
      j: n,
      key: 0,
      action: 'done',
      description: `¡Listo! Todo el vector está perfectamente ordenado de menor a mayor.`,
      sortedUpTo: n - 1,
    });

    return generatedSteps;
  }, [initialArray]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Auto-play timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  const maxVal = Math.max(...initialArray, 100);

  return (
    <div className="space-y-8">
      {/* Intro card for Fabrix */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-2">
          <BarChart2 className="w-3.5 h-3.5" /> Tema 2 • Algoritmos de Ordenamiento
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Ordenamiento por Inserción (Insertion Sort)
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          ¡Acomodar cartas en tu mano! Cuando juegas cartas, tomas una carta nueva (la <span className="font-semibold text-amber-800">clave</span>) 
          y la vas deslizando hacia la izquierda entre las cartas que ya tienes en orden hasta ponerla en su lugar.
          Esa es exactamente la lógica de este algoritmo.
        </p>
      </div>

      {/* Interactive visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-6">
        {/* Controls header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">Elementos:</span>
              <input
                type="number"
                min="3"
                max="10"
                value={arraySize}
                onChange={(e) => {
                  const s = parseInt(e.target.value) || 7;
                  const valid = Math.min(10, Math.max(3, s));
                  setArraySize(valid);
                  const newArr = generateRandomArray(valid);
                  setInitialArray(newArr);
                  setCustomInput(newArr.join(', '));
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                }}
                className="w-12 px-1.5 py-0.5 rounded border border-slate-300 font-mono text-center"
              />
            </div>

            <button
              type="button"
              onClick={handleRegenerate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" /> Generar Nuevos Números
            </button>
          </div>

          {/* Custom vector input */}
          <div className="flex items-center gap-2 text-xs">
            <input
              type="text"
              placeholder="Ej: 34, 12, 89, 5, 20"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 w-48 font-mono text-xs"
            />
            <button
              type="button"
              onClick={handleApplyCustom}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-900 font-semibold cursor-pointer"
            >
              Probar mi vector
            </button>
          </div>
        </div>

        {/* Visual Bar / Card Stage */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col items-center justify-center min-h-[320px]">
          {/* Key indicator floating */}
          <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Carta en mano (clave actual):</span>
              {currentStep.action !== 'done' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono font-bold text-sm">
                  <ArrowDown className="w-3.5 h-3.5" /> {currentStep.key}
                </div>
              ) : (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Todas insertadas
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>i = {currentStep.i}</span>
              <span>j = {currentStep.j}</span>
              <span className="text-slate-500">Paso {currentStepIndex + 1}/{steps.length}</span>
            </div>
          </div>

          {/* Array Elements Visualizer */}
          <div className="w-full flex items-end justify-center gap-2 sm:gap-3 py-4 h-52">
            {currentStep.array.map((val, idx) => {
              const isSorted = idx <= currentStep.sortedUpTo;
              const isComparing = currentStep.action === 'compare' && idx === currentStep.j;
              const isShifting = currentStep.action === 'shift' && idx === currentStep.j + 1;
              const isInserting = currentStep.action === 'insert' && idx === currentStep.j;
              const heightPercent = Math.max(18, Math.round((val / maxVal) * 100));

              let barColor = 'bg-slate-700 border-slate-600 text-slate-300';
              let badgeText = '';

              if (currentStep.action === 'done') {
                barColor = 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-950/40';
              } else if (isComparing) {
                barColor = 'bg-purple-600 border-purple-400 text-white ring-4 ring-purple-400/40 animate-pulse';
                badgeText = 'arr[j]';
              } else if (isShifting) {
                barColor = 'bg-rose-500 border-rose-300 text-white shadow-md';
                badgeText = 'mueve →';
              } else if (isInserting) {
                barColor = 'bg-amber-500 border-amber-300 text-slate-950 font-black ring-4 ring-amber-300/60 shadow-lg';
                badgeText = 'inserta';
              } else if (isSorted) {
                barColor = 'bg-emerald-600/80 border-emerald-500 text-emerald-100';
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[64px]">
                  {/* Badge above element */}
                  <span className="text-[10px] font-mono h-4 text-amber-300 font-bold truncate">
                    {badgeText}
                  </span>

                  {/* Vertical bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-xl border flex flex-col items-center justify-between p-1.5 transition-all duration-300 ${barColor}`}
                  >
                    <span className="text-xs font-mono font-black">{val}</span>
                  </div>

                  {/* Index under element */}
                  <div className="text-[10px] font-mono text-slate-400">
                    [{idx}]
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Parte ordenada [0..i-1]
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Comparando con arr[j]
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Clave insertada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span> Pendiente por ordenar
            </span>
          </div>
        </div>

        {/* Step description tracker */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> ¿Qué está pasando ahora mismo?
            </span>
            <span className="text-xs font-mono text-slate-500">
              Paso {currentStepIndex + 1} de {steps.length}
            </span>
          </div>
          <p className="text-sm text-slate-800 font-medium">
            {currentStep.description}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentStepIndex === 0}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              }}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                currentStepIndex === 0 ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="Paso anterior"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pausar' : 'Reproducir Paso a Paso'}</span>
            </button>
            <button
              type="button"
              disabled={currentStepIndex >= steps.length - 1}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                currentStepIndex >= steps.length - 1 ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="Siguiente paso"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span>Velocidad:</span>
            <input
              type="range"
              min="300"
              max="2000"
              step="100"
              value={speedMs}
              onChange={(e) => setSpeedMs(parseInt(e.target.value))}
              className="w-28 cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-500">{(speedMs / 1000).toFixed(1)}s</span>
          </div>
        </div>
      </div>

      {/* Comparative Table: Insertion vs Selection vs Bubble */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Comparativa de Algoritmos Básicos: Inserción vs. Selección vs. Burbuja
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          En la secundaria suelen enseñar estos tres algoritmos. ¡Observa sus diferencias y por qué Inserción es tan especial!
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Algoritmo</th>
                <th className="p-3">Idea Central</th>
                <th className="p-3">Mejor Caso (ya ordenado)</th>
                <th className="p-3">Peor Caso</th>
                <th className="p-3">¿Por qué usarlo?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="bg-amber-50/50 font-medium">
                <td className="p-3 font-bold text-amber-900">🎴 Inserción (Insertion)</td>
                <td className="p-3">Inserta cada carta en su lugar hacia la izquierda</td>
                <td className="p-3 text-emerald-700 font-bold">O(n) - ¡Súper rápido!</td>
                <td className="p-3">O(n²)</td>
                <td className="p-3 text-amber-900">Excelente para listas pequeñas o casi ordenadas.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-sky-900">🔍 Selección (Selection)</td>
                <td className="p-3">Busca el número menor de todos y lo coloca al frente</td>
                <td className="p-3 text-slate-600">O(n²)</td>
                <td className="p-3">O(n²)</td>
                <td className="p-3">Hace muy pocos intercambios físicos de memoria.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-900">🫧 Burbuja (Bubble)</td>
                <td className="p-3">Intercambia vecinos adyacentes hasta que los grandes "flotan"</td>
                <td className="p-3 text-emerald-700">O(n) (con bandera de control)</td>
                <td className="p-3">O(n²)</td>
                <td className="p-3">El más fácil de entender al empezar a programar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Flowchart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Diagrama de Flujo: Inserción</h3>
        <p className="text-xs text-slate-500 mb-4">
          Sigue el camino del ciclo MIENTRAS (while) donde se desplazan los elementos a la derecha.
        </p>
        <FlowchartSVG type="insertion-sort" />
      </div>

      {/* Code Implementations */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-2">Código Fuente Comentado: Python vs JavaScript</h3>
        <p className="text-xs text-slate-500 mb-4">
          Revisa cómo se declara la variable `clave`, el ciclo `while` y el retorno del vector ordenado.
        </p>
        <CodeViewer example={sortingCode} defaultLang="python" />
      </div>

      {/* Mini-Quiz */}
      <QuizCard
        title="Mini-Examen: Ordenamiento por Inserción"
        subtitle="Pon a prueba tus conocimientos sobre la clave, desplazamientos y el mejor caso del algoritmo."
        questions={sortingQuiz}
      />
    </div>
  );
};
