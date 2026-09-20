import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, Eye, HelpCircle, RotateCcw, Sparkles, Check, AlertCircle } from 'lucide-react';
import { StackItem, StackLog } from '../types';
import { stackCode } from '../data/codeSnippets';
import { stackQuiz } from '../data/quizData';
import { FlowchartSVG } from './FlowchartSVG';
import { CodeViewer } from './CodeViewer';
import { QuizCard } from './QuizCard';

// Color palette for stack items
const ITEM_COLORS = [
  'bg-sky-500 border-sky-600 text-white',
  'bg-indigo-500 border-indigo-600 text-white',
  'bg-emerald-500 border-emerald-600 text-white',
  'bg-amber-500 border-amber-600 text-slate-950',
  'bg-rose-500 border-rose-600 text-white',
  'bg-purple-500 border-purple-600 text-white',
  'bg-teal-500 border-teal-600 text-white',
];

export const StackTopic: React.FC = () => {
  // Stack state
  const [stack, setStack] = useState<StackItem[]>([
    { id: 'item-1', value: 34, color: ITEM_COLORS[0] },
    { id: 'item-2', value: 78, color: ITEM_COLORS[1] },
    { id: 'item-3', value: 15, color: ITEM_COLORS[2] },
  ]);

  // Labels matching homework requirement
  const [labelMessage, setLabelMessage] = useState<string>('Pila lista con 3 elementos iniciales');
  const [statusMessage, setStatusMessage] = useState<string>('Listo para operar');
  const [lastAction, setLastAction] = useState<string>('');
  const [lastPoppedValue, setLastPoppedValue] = useState<number | null>(null);

  // History log
  const [logs, setLogs] = useState<StackLog[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      action: 'PUSH',
      detail: 'Inicialización de demostración',
      result: 'Valores: [34, 78, 15]',
    },
  ]);

  // Custom number input option for student experimentation
  const [customValue, setCustomValue] = useState<string>('');

  // 1) PUSH (Random 1-100 or custom)
  const handlePush = (valOverride?: number) => {
    const value = valOverride !== undefined ? valOverride : Math.floor(Math.random() * 100) + 1;
    const color = ITEM_COLORS[stack.length % ITEM_COLORS.length];
    const newItem: StackItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      value,
      color,
    };

    const newStack = [...stack, newItem];
    setStack(newStack);
    setLastAction('PUSH');
    setLastPoppedValue(null);
    setLabelMessage(`Push: Se insertó el número ${value} en la cima`);
    setStatusMessage(`Pila: [${newStack.map((it) => it.value).join(', ')}]`);

    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        action: 'PUSH',
        detail: `push(${value})`,
        result: `Pila: [${newStack.map((it) => it.value).join(', ')}] (Cima: ${value})`,
      },
      ...prev.slice(0, 9),
    ]);
  };

  // 2) POP
  const handlePop = () => {
    if (stack.length === 0) {
      setLastAction('POP_EMPTY');
      setLabelMessage('Pop ignorado: La pila está vacía (Underflow)');
      setStatusMessage('Pila: []');
      setLogs((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          action: 'POP',
          detail: 'pop() invocado en pila vacía',
          result: 'Ignorado (Guard clause if self.pila)',
        },
        ...prev.slice(0, 9),
      ]);
      return;
    }

    const popped = stack[stack.length - 1];
    const newStack = stack.slice(0, -1);
    setStack(newStack);
    setLastAction('POP');
    setLastPoppedValue(popped.value);
    setLabelMessage(`Pop: Se eliminó el número ${popped.value} de la cima`);
    setStatusMessage(`Pila: [${newStack.map((it) => it.value).join(', ')}]`);

    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        action: 'POP',
        detail: `pop() extrajo ${popped.value}`,
        result: `Pila restante: [${newStack.map((it) => it.value).join(', ')}]`,
      },
      ...prev.slice(0, 9),
    ]);
  };

  // 3) TOP
  const handleTop = () => {
    if (stack.length === 0) {
      setLastAction('TOP_EMPTY');
      setLabelMessage('Top: Pila vacía (no hay elemento superior)');
      setStatusMessage('Top: null');
      setLogs((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          action: 'TOP',
          detail: 'top() en pila vacía',
          result: 'Sin cima',
        },
        ...prev.slice(0, 9),
      ]);
      return;
    }

    const topVal = stack[stack.length - 1].value;
    setLastAction('TOP');
    setLabelMessage(`Top: ${topVal} (Elemento en la cima)`);
    setStatusMessage(`El último en entrar fue: ${topVal}`);

    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        action: 'TOP',
        detail: `top() consultado`,
        result: `Valor en la cima = ${topVal} (sin eliminar)`,
      },
      ...prev.slice(0, 9),
    ]);
  };

  // 4) EMPTY
  const handleEmpty = () => {
    setLastAction('EMPTY');
    if (stack.length === 0) {
      setLabelMessage('Pila vacía');
      setStatusMessage('Estado: len == 0 (True)');
    } else {
      setLabelMessage(`Pila no vacía (tiene ${stack.length} elementos)`);
      setStatusMessage(`Estado: len != 0 (False)`);
    }

    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        action: 'EMPTY',
        detail: `empty() comprobado`,
        result: stack.length === 0 ? 'Pila vacía' : `Pila no vacía (${stack.length} elementos)`,
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleResetStack = () => {
    setStack([]);
    setLabelMessage('Pila vaciada completamente');
    setStatusMessage('Pila: []');
    setLastPoppedValue(null);
  };

  const handlePushCustom = () => {
    const num = parseInt(customValue);
    if (!isNaN(num)) {
      handlePush(num);
      setCustomValue('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro card for Fabrix */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 mb-2">
          <Layers className="w-3.5 h-3.5" /> Tema 3 • Estructura de Datos LIFO
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Pilas (Stack — Estructura LIFO)
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          ¡Hola Fabrix! Una <span className="font-semibold text-emerald-800">Pila (Stack)</span> funciona exactamente igual que una pila de platos o una pila de panqueques recién hechos: 
          el <strong>último</strong> que cocinas y pones arriba es el <strong>primero</strong> que tomas para comer. 
          A esto se le llama <strong>LIFO</strong> (<em>Last-In, First-Out</em>).
        </p>
      </div>

      {/* Main dual-panel simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Stack Simulation Container */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Simulador Visual 3D de Pila</h3>
              <p className="text-xs text-slate-500">Observa cómo entran y salen los elementos por la cima (Top)</p>
            </div>
            <button
              type="button"
              onClick={handleResetStack}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Vaciar
            </button>
          </div>

          {/* Visual Container */}
          <div className="relative w-full max-w-sm mx-auto h-80 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-end items-center overflow-hidden shadow-inner">
            {/* Top pointer marker */}
            {stack.length > 0 && (
              <div className="absolute right-3 bottom-[calc(2.75rem*var(--stack-count))] transition-all flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono">
                <span className="animate-pulse">👈 TOP</span>
                <span className="text-[10px] text-slate-400">pila[{stack.length - 1}]</span>
              </div>
            )}

            {/* Empty state indication */}
            {stack.length === 0 && (
              <div className="my-auto text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-slate-600" />
                </div>
                <span>La pila está completamente vacía (len == 0)</span>
                <span className="text-[11px] text-slate-600">Presiona "Push" para agregar elementos</span>
              </div>
            )}

            {/* Stack elements rendered from bottom to top */}
            <div className="w-full flex flex-col-reverse gap-2 z-10">
              {stack.map((item, index) => {
                const isTop = index === stack.length - 1;
                return (
                  <div
                    key={item.id}
                    className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between font-mono font-bold text-sm shadow-md transition-all duration-300 transform ${
                      item.color
                    } ${isTop ? 'ring-2 ring-amber-300 scale-[1.02]' : 'opacity-90'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-75 font-normal">[{index}]</span>
                      <span>Valor: {item.value}</span>
                    </div>
                    {isTop && (
                      <span className="text-[10px] uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded font-bold">
                        Cima (Top)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Base platform */}
            <div className="w-full h-3 bg-slate-800 rounded-b-lg border-t border-slate-700 mt-2"></div>
          </div>

          {/* Last operation status pill */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Estado actual:</span>
              <span className="font-mono text-indigo-700 font-semibold">{labelMessage}</span>
            </div>
            {lastPoppedValue !== null && (
              <div className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold font-mono">
                Último Pop: {lastPoppedValue}
              </div>
            )}
          </div>

          {/* Operation history log */}
          <div>
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Registro de Operaciones (Logs)
            </span>
            <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-[11px] bg-slate-900 text-slate-300 p-3 rounded-xl border border-slate-800">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-800/50">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span
                    className={`font-bold ${
                      log.action === 'PUSH'
                        ? 'text-sky-400'
                        : log.action === 'POP'
                        ? 'text-rose-400'
                        : log.action === 'TOP'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {log.detail}
                  </span>
                  <span className="text-slate-400 truncate max-w-[180px]">{log.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Classroom HW GUI (Tkinter / HTML exact replica) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Exact Replica of Student Homework GUI */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/70 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-200">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Interfaz Requerida en Clase (Tkinter / HTML)
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-mono">
                width: 400px
              </span>
            </div>

            {/* Centered Label */}
            <div className="my-4 text-center">
              <p
                id="label"
                className="font-mono text-sm sm:text-base font-bold text-slate-900 bg-white/90 py-2.5 px-3 rounded-xl border border-amber-200 shadow-xs"
              >
                Pila: [{stack.map((s) => s.value).join(', ')}]
              </p>
              <p id="status" className="text-xs font-medium text-slate-600 mt-2">
                {statusMessage}
              </p>
            </div>

            {/* 4 Standard Required Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {/* Button 1: Push (random 1-100) */}
              <button
                id="btn-push"
                type="button"
                onClick={() => handlePush()}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-sky-200 hover:bg-sky-300 text-sky-950 border border-sky-300 shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5 text-sky-800" />
                <span>b1: Push (1-100)</span>
              </button>

              {/* Button 2: Pop */}
              <button
                id="btn-pop"
                type="button"
                onClick={handlePop}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-rose-200 hover:bg-rose-300 text-rose-950 border border-rose-300 shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-rose-800" />
                <span>b2: Pop</span>
              </button>

              {/* Button 3: Top */}
              <button
                id="btn-top"
                type="button"
                onClick={handleTop}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-200 hover:bg-emerald-300 text-emerald-950 border border-emerald-300 shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-800" />
                <span>b3: Top</span>
              </button>

              {/* Button 4: Empty */}
              <button
                id="btn-empty"
                type="button"
                onClick={handleEmpty}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-300 shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-800" />
                <span>b4: Empty?</span>
              </button>
            </div>

            {/* Custom Push Addon for Fabrix */}
            <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center gap-2">
              <input
                type="number"
                placeholder="Valor manual (ej. 42)"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-mono w-full"
              />
              <button
                type="button"
                onClick={handlePushCustom}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 shrink-0 cursor-pointer"
              >
                Push manual
              </button>
            </div>
          </div>

          {/* Educational Concept Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Reglas de Oro de una Pila
            </h4>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>LIFO:</strong> El último en entrar es el primero en salir. No puedes sacar un elemento de abajo sin quitar los de arriba antes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Top vs. Pop:</strong> <code>top()</code> solo mira (como asomarse a ver el plato de arriba). <code>pop()</code> retira el plato físicamente.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Guard clause:</strong> Siempre verificar <code>if self.pila:</code> para evitar el error de intentar sacar de una pila vacía.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Flowcharts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Diagramas de Flujo: Push y Pop</h3>
        <p className="text-xs text-slate-500 mb-4">
          Fíjate cómo el método <code>pop()</code> evalúa el rombo de decisión para comprobar que la pila no esté vacía antes de extraer.
        </p>
        <FlowchartSVG type="stack-operations" />
      </div>

      {/* Code Implementations */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-2">Código Fuente Comentado: Python (Tkinter) vs JavaScript</h3>
        <p className="text-xs text-slate-500 mb-4">
          Aquí tienes la implementación exacta requerida con la clase <code>App</code>, sin librerías externas de pila.
        </p>
        <CodeViewer example={stackCode} defaultLang="python" />
      </div>

      {/* Mini-Quiz */}
      <QuizCard
        title="Mini-Examen: Pilas (Stack - LIFO)"
        subtitle="Verifica que dominas los conceptos de LIFO, push, pop, top y la condición de lista vacía."
        questions={stackQuiz}
      />
    </div>
  );
};
