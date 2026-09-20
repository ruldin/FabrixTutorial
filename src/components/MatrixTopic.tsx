import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Shuffle, Sparkles, Layers, Info } from 'lucide-react';
import { MatrixStep } from '../types';
import { matrixCode } from '../data/codeSnippets';
import { matrixQuiz } from '../data/quizData';
import { FlowchartSVG } from './FlowchartSVG';
import { CodeViewer } from './CodeViewer';
import { QuizCard } from './QuizCard';

export const MatrixTopic: React.FC = () => {
  // Dimensions state
  const [rowsA, setRowsA] = useState<number>(2);
  const [colsA, setColsA] = useState<number>(3);
  const [rowsB, setRowsB] = useState<number>(3);
  const [colsB, setColsB] = useState<number>(2);

  // Matrices
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);

  // Selected operation: 'add' or 'mult'
  const [operation, setOperation] = useState<'add' | 'mult'>('mult');

  // Simulator playback state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);

  // Random matrix generator (integers 1 to 10)
  const generateRandomMatrix = (r: number, c: number): number[][] => {
    const validR = Math.max(1, Math.min(5, r));
    const validC = Math.max(1, Math.min(5, c));
    return Array.from({ length: validR }, () =>
      Array.from({ length: validC }, () => Math.floor(Math.random() * 10) + 1)
    );
  };

  // Initialize or regenerate matrices
  const handleRegenerate = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setMatrixA(generateRandomMatrix(rowsA, colsA));
    setMatrixB(generateRandomMatrix(rowsB, colsB));
  };

  // Quick preset buttons for Fabrix
  const setPreset = (type: 'add-square' | 'add-rect' | 'mult-valid' | 'mult-square') => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    if (type === 'add-square') {
      setRowsA(2); setColsA(2);
      setRowsB(2); setColsB(2);
      setOperation('add');
      setMatrixA(generateRandomMatrix(2, 2));
      setMatrixB(generateRandomMatrix(2, 2));
    } else if (type === 'add-rect') {
      setRowsA(2); setColsA(3);
      setRowsB(2); setColsB(3);
      setOperation('add');
      setMatrixA(generateRandomMatrix(2, 3));
      setMatrixB(generateRandomMatrix(2, 3));
    } else if (type === 'mult-valid') {
      setRowsA(2); setColsA(3);
      setRowsB(3); setColsB(2);
      setOperation('mult');
      setMatrixA(generateRandomMatrix(2, 3));
      setMatrixB(generateRandomMatrix(3, 2));
    } else if (type === 'mult-square') {
      setRowsA(2); setColsA(2);
      setRowsB(2); setColsB(2);
      setOperation('mult');
      setMatrixA(generateRandomMatrix(2, 2));
      setMatrixB(generateRandomMatrix(2, 2));
    }
  };

  // Run initial matrix creation on mount
  useEffect(() => {
    setPreset('mult-valid');
  }, []);

  // Validation checks
  const canAdd = matrixA.length > 0 && matrixB.length > 0 &&
    matrixA.length === matrixB.length && matrixA[0]?.length === matrixB[0]?.length;

  const canMultiply = matrixA.length > 0 && matrixB.length > 0 &&
    matrixA[0]?.length === matrixB.length;

  // Build steps based on chosen operation
  const steps: MatrixStep[] = useMemo(() => {
    if (!matrixA.length || !matrixB.length) return [];

    if (operation === 'add') {
      if (!canAdd) return [];
      const result: number[][] = Array.from({ length: matrixA.length }, () =>
        Array(matrixA[0].length).fill(0)
      );
      const generatedSteps: MatrixStep[] = [];

      let stepNum = 0;
      for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixA[0].length; j++) {
          const aVal = matrixA[i][j];
          const bVal = matrixB[i][j];
          const sum = aVal + bVal;
          result[i][j] = sum;

          // snapshot of current result
          const snapshot = result.map((r) => [...r]);

          generatedSteps.push({
            stepIndex: stepNum++,
            description: `Sumando celda [${i}][${j}]: A[${i}][${j}] (${aVal}) + B[${i}][${j}] (${bVal}) = ${sum}`,
            activeI: i,
            activeJ: j,
            calcText: `${aVal} + ${bVal} = ${sum}`,
            resultMatrix: snapshot,
            currentSum: sum,
          });
        }
      }
      return generatedSteps;
    }

    if (operation === 'mult') {
      if (!canMultiply) return [];
      const m = matrixA.length;
      const kDim = matrixA[0].length;
      const n = matrixB[0].length;

      const result: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
      const generatedSteps: MatrixStep[] = [];

      let stepNum = 0;
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          let runningSum = 0;
          const subCalcs: { aVal: number; bVal: number; prod: number }[] = [];

          for (let k = 0; k < kDim; k++) {
            const aVal = matrixA[i][k];
            const bVal = matrixB[k][j];
            const prod = aVal * bVal;
            runningSum += prod;
            subCalcs.push({ aVal, bVal, prod });

            result[i][j] = runningSum;
            const snapshot = result.map((r) => [...r]);

            generatedSteps.push({
              stepIndex: stepNum++,
              description: `Multiplicando: Fila ${i} de A con Columna ${j} de B en paso k = ${k}. Multiplicamos A[${i}][${k}] (${aVal}) × B[${k}][${j}] (${bVal}) = ${prod}. Suma acumulada = ${runningSum}`,
              activeI: i,
              activeJ: j,
              activeK: k,
              calcText: subCalcs.map((sc) => `(${sc.aVal} × ${sc.bVal})`).join(' + ') + ` = ${runningSum}`,
              resultMatrix: snapshot,
              subCalculations: [...subCalcs],
              currentSum: runningSum,
            });
          }
        }
      }
      return generatedSteps;
    }

    return [];
  }, [matrixA, matrixB, operation, canAdd, canMultiply]);

  // Current active step
  const currentStep = steps[currentStepIndex] || null;

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

  return (
    <div className="space-y-8">
      {/* Intro card for Fabrix */}
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 mb-2">
              <Layers className="w-3.5 h-3.5" /> Tema 1 • Estructuras Bidimensionales
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Manejo de Matrices: Suma y Multiplicación
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              ¡Hola Fabrix! Una <span className="font-semibold text-sky-700">matriz</span> es una tabla con filas y columnas (como una cuadrícula o una hoja de cálculo). 
              En programación se representa como una <strong>lista de listas</strong> (en Python: <code className="bg-white/80 px-1 py-0.5 rounded text-xs text-sky-900">[[1, 2], [3, 4]]</code>).
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setPreset('add-rect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                operation === 'add' ? 'bg-sky-600 text-white border-sky-600 shadow-sm' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Ejemplo Suma (2x3)
            </button>
            <button
              type="button"
              onClick={() => setPreset('mult-valid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                operation === 'mult' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Ejemplo Multiplicación (2x3 × 3x2)
            </button>
          </div>
        </div>
      </div>

      {/* Simulator workspace */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-6">
        {/* Controls: Dimensions and Regenerate */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b border-slate-100">
          <div className="md:col-span-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
              <span>Dimensiones Matriz A</span>
              <span className="text-sky-600 font-mono font-bold">{rowsA} × {colsA}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">Filas:</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={rowsA}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 1;
                    setRowsA(Math.min(4, Math.max(1, v)));
                    setCurrentStepIndex(0);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Columnas:</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={colsA}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 1;
                    setColsA(Math.min(4, Math.max(1, v)));
                    setCurrentStepIndex(0);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
              <span>Dimensiones Matriz B</span>
              <span className="text-indigo-600 font-mono font-bold">{rowsB} × {colsB}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">Filas:</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={rowsB}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 1;
                    setRowsB(Math.min(4, Math.max(1, v)));
                    setCurrentStepIndex(0);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Columnas:</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={colsB}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 1;
                    setColsB(Math.min(4, Math.max(1, v)));
                    setCurrentStepIndex(0);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Operación</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setOperation('add');
                    setCurrentStepIndex(0);
                  }}
                  className={`py-1.5 px-2 rounded-lg font-semibold transition cursor-pointer ${
                    operation === 'add' ? 'bg-sky-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Suma (A + B)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOperation('mult');
                    setCurrentStepIndex(0);
                  }}
                  className={`py-1.5 px-2 rounded-lg font-semibold transition cursor-pointer ${
                    operation === 'mult' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Multiplicación (A × B)
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRegenerate}
              className="mt-2 w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 transition cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span>Generar Aleatorios (1-10)</span>
            </button>
          </div>
        </div>

        {/* Validation Alert */}
        {operation === 'add' && !canAdd && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">⚠️ Dimensiones incompatibles para Suma:</strong> Matriz A es {rowsA}×{colsA} y Matriz B es {rowsB}×{colsB}. 
              Para sumarlas, ambas deben tener exactamente las mismas filas y columnas. Haz clic en el botón <em>"Ejemplo Suma"</em> arriba para ajustarlas automáticamente.
            </div>
          </div>
        )}

        {operation === 'mult' && !canMultiply && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">⚠️ Dimensiones incompatibles para Multiplicación Matricial:</strong> Columnas de A ({colsA}) no coincide con Filas de B ({rowsB}). 
              La regla es: columnas(A) debe ser igual a filas(B). Haz clic en <em>"Ejemplo Multiplicación"</em> arriba para configurarlo automáticamente.
            </div>
          </div>
        )}

        {/* Visual Matrices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Matrix A */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-xs uppercase text-sky-800 tracking-wide">
                Matriz A ({matrixA.length}×{matrixA[0]?.length || 0})
              </span>
              <span className="text-[11px] font-mono text-slate-500">Valores entre 1 y 10</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className="p-1 text-[10px] text-slate-400 font-mono"></th>
                    {matrixA[0]?.map((_, colIdx) => (
                      <th key={colIdx} className="p-1 text-[10px] text-slate-500 font-mono">
                        col {colIdx}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixA.map((row, rIdx) => {
                    const isRowActive = currentStep && currentStep.activeI === rIdx;
                    return (
                      <tr key={rIdx}>
                        <td className="p-1 text-[10px] text-slate-500 font-mono pr-2">f{rIdx}</td>
                        {row.map((val, cIdx) => {
                          const isCellActiveInAdd = operation === 'add' && currentStep && currentStep.activeI === rIdx && currentStep.activeJ === cIdx;
                          const isCellActiveInMult = operation === 'mult' && currentStep && currentStep.activeI === rIdx && currentStep.activeK === cIdx;
                          const isCellSelected = isCellActiveInAdd || isCellActiveInMult;

                          return (
                            <td key={cIdx} className="p-1">
                              <div
                                className={`w-11 h-11 mx-auto flex items-center justify-center rounded-lg font-mono text-sm font-bold transition-all ${
                                  isCellSelected
                                    ? 'bg-sky-500 text-white ring-2 ring-sky-300 shadow-md scale-105'
                                    : isRowActive
                                    ? 'bg-sky-100 text-sky-900 border border-sky-300'
                                    : 'bg-white text-slate-700 border border-slate-200'
                                }`}
                              >
                                {val}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Matrix B */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-xs uppercase text-indigo-800 tracking-wide">
                Matriz B ({matrixB.length}×{matrixB[0]?.length || 0})
              </span>
              <span className="text-[11px] font-mono text-slate-500">Valores entre 1 y 10</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className="p-1 text-[10px] text-slate-400 font-mono"></th>
                    {matrixB[0]?.map((_, colIdx) => (
                      <th key={colIdx} className="p-1 text-[10px] text-slate-500 font-mono">
                        col {colIdx}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixB.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-1 text-[10px] text-slate-500 font-mono pr-2">f{rIdx}</td>
                      {row.map((val, cIdx) => {
                        const isColActive = currentStep && currentStep.activeJ === cIdx;
                        const isCellActiveInAdd = operation === 'add' && currentStep && currentStep.activeI === rIdx && currentStep.activeJ === cIdx;
                        const isCellActiveInMult = operation === 'mult' && currentStep && currentStep.activeK === rIdx && currentStep.activeJ === cIdx;
                        const isCellSelected = isCellActiveInAdd || isCellActiveInMult;

                        return (
                          <td key={cIdx} className="p-1">
                            <div
                              className={`w-11 h-11 mx-auto flex items-center justify-center rounded-lg font-mono text-sm font-bold transition-all ${
                                isCellSelected
                                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-md scale-105'
                                  : isColActive
                                  ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                  : 'bg-white text-slate-700 border border-slate-200'
                              }`}
                            >
                              {val}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Result Matrix C */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-xs uppercase text-emerald-900 tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Matriz Resultado C {operation === 'add' ? '(A + B)' : '(A × B)'}
              </span>
              <span className="text-[11px] font-mono text-emerald-700">
                {currentStep ? `Paso ${currentStepIndex + 1}/${steps.length}` : 'Calculando'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className="p-1 text-[10px] text-slate-400 font-mono"></th>
                    {(currentStep?.resultMatrix[0] || (operation === 'add' ? matrixA[0] : matrixB[0]))?.map((_, colIdx) => (
                      <th key={colIdx} className="p-1 text-[10px] text-emerald-800 font-mono">
                        col {colIdx}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(currentStep?.resultMatrix || []).map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-1 text-[10px] text-emerald-700 font-mono pr-2">f{rIdx}</td>
                      {row.map((val, cIdx) => {
                        const isCurrentResultCell = currentStep && currentStep.activeI === rIdx && currentStep.activeJ === cIdx;
                        return (
                          <td key={cIdx} className="p-1">
                            <div
                              className={`w-11 h-11 mx-auto flex items-center justify-center rounded-lg font-mono text-sm font-bold transition-all ${
                                isCurrentResultCell
                                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 shadow-lg scale-110 animate-pulse'
                                  : val > 0
                                  ? 'bg-white text-emerald-900 border border-emerald-300 shadow-xs'
                                  : 'bg-emerald-100/50 text-emerald-400 border border-dashed border-emerald-300'
                              }`}
                            >
                              {val > 0 ? val : '·'}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Variable Inspector & Math step breakdown */}
        {currentStep && (
          <div className="bg-slate-900 rounded-xl p-4 text-slate-100 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5 mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  Paso {currentStepIndex + 1} de {steps.length}
                </span>
                <span className="text-slate-400">Inspección de Variables en Tiempo Real:</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-amber-300 text-xs">
                <span>fila <strong>i = {currentStep.activeI}</strong></span>
                <span>col <strong>j = {currentStep.activeJ}</strong></span>
                {currentStep.activeK !== undefined && (
                  <span className="text-sky-300">término <strong>k = {currentStep.activeK}</strong></span>
                )}
              </div>
            </div>

            <p className="text-sm font-sans text-slate-200 mb-3">
              {currentStep.description}
            </p>

            <div className="p-2.5 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 border border-slate-800/80 flex items-center justify-between">
              <span>Fórmula en ejecución: <strong className="text-white">{currentStep.calcText}</strong></span>
              <span className="text-slate-400">C[{currentStep.activeI}][{currentStep.activeJ}]</span>
            </div>
          </div>
        )}

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
              title="Reiniciar al paso 1"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition cursor-pointer"
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

      {/* Flowchart Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Diagrama de Flujo del Algoritmo</h3>
            <p className="text-xs text-slate-500">Comprensión visual de los ciclos anidados y condiciones lógicas.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">Diagrama:</span>
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-semibold">
              {operation === 'add' ? 'Suma de Matrices' : 'Multiplicación Matricial (Producto Punto)'}
            </span>
          </div>
        </div>

        <FlowchartSVG type={operation === 'add' ? 'matrices-addition' : 'matrices-multiplication'} />
      </div>

      {/* Code Implementations (Python vs JS) */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-2">Código Fuente Comentado: Python vs JavaScript</h3>
        <p className="text-xs text-slate-500 mb-4">
          Compara cómo se implementa la generación de matrices aleatorias y las operaciones en ambos lenguajes.
        </p>
        <CodeViewer example={matrixCode} defaultLang="python" />
      </div>

      {/* Mini-Quiz for Matrices */}
      <QuizCard
        title="Mini-Examen: Manejo de Matrices"
        subtitle="Comprueba lo que has aprendido sobre dimensiones, índices en base cero y operaciones matriciales."
        questions={matrixQuiz}
      />
    </div>
  );
};
