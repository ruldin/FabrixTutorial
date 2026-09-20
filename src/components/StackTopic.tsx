import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, Eye, HelpCircle, RotateCcw, Sparkles, Check, AlertCircle, MousePointer2, Ban } from 'lucide-react';
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

const MAX = 10; // Capacidad fija: arreglo de 10 posiciones (índices 0..9)

interface Trace {
  from: number;
  to: number;
  slot: number;
  op: string;
}

const initialDatos = (): (StackItem | null)[] => {
  const arr: (StackItem | null)[] = new Array(MAX).fill(null);
  arr[0] = { id: 'item-1', value: 34, color: ITEM_COLORS[0] };
  arr[1] = { id: 'item-2', value: 78, color: ITEM_COLORS[1] };
  arr[2] = { id: 'item-3', value: 15, color: ITEM_COLORS[2] };
  return arr;
};

export const StackTopic: React.FC = () => {
  // PILA MANUAL: arreglo fijo de 10 + puntero tope. PROHIBIDO append/pop.
  const [datos, setDatos] = useState<(StackItem | null)[]>(initialDatos);
  const [tope, setTope] = useState<number>(2); // -1 = vacía, 9 = llena

  const count = tope + 1; // cantidad de elementos ocupados

  // Labels matching homework requirement
  const [labelMessage, setLabelMessage] = useState<string>('Pila lista: 3/10 elementos, tope=2');
  const [statusMessage, setStatusMessage] = useState<string>('Listo para operar (tope=-1 significa vacía)');
  const [lastAction, setLastAction] = useState<string>('');
  const [lastPoppedValue, setLastPoppedValue] = useState<number | null>(null);
  const [trace, setTrace] = useState<Trace | null>(null);

  // History log
  const [logs, setLogs] = useState<StackLog[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      action: 'PUSH',
      detail: 'Inicialización manual: datos[0]=34, datos[1]=78, datos[2]=15, tope=2',
      result: 'Pila: [34, 78, 15] (3/10)',
    },
  ]);

  // Custom number input option for student experimentation
  const [customValue, setCustomValue] = useState<string>('');

  const pushLog = (detail: string, result: string, action: StackLog['action']) => {
    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), action, detail, result },
      ...prev.slice(0, 9),
    ]);
  };

  const verPila = (arr: (StackItem | null)[], t: number): number[] => {
    const out: number[] = [];
    for (let i = 0; i <= t; i++) {
      const it = arr[i];
      if (it) out.push(it.value);
    }
    return out;
  };

  // 1) PUSH MANUAL (sin append): tope+1 y datos[tope]=valor
  const handlePush = (valOverride?: number) => {
    const value = valOverride !== undefined ? valOverride : Math.floor(Math.random() * 100) + 1;
    // PASO 1: ¿Hay espacio? tope < MAX-1 (9). Si no, OVERFLOW.
    if (tope >= MAX - 1) {
      setLastAction('OVERFLOW');
      setTrace(null);
      setLabelMessage(`OVERFLOW: pila llena 10/10, no cabe el ${value} (tope=9)`);
      setStatusMessage('Pila: llena — haz Pop para liberar una casilla');
      pushLog(`push(${value}) rechazado`, 'OVERFLOW: 10/10 lleno (tope=9)', 'PUSH');
      return;
    }
    // PASO 2: subir puntero, PASO 3: escribir casilla
    const nuevoTope = tope + 1;
    const color = ITEM_COLORS[nuevoTope % ITEM_COLORS.length];
    const newItem: StackItem = { id: `item-${Date.now()}-${Math.random()}`, value, color };
    const nuevos = [...datos];
    nuevos[nuevoTope] = newItem; // asignación directa, SIN append
    setDatos(nuevos);
    setTope(nuevoTope);
    setLastAction('PUSH');
    setLastPoppedValue(null);
    setTrace({ from: tope, to: nuevoTope, slot: nuevoTope, op: `datos[${nuevoTope}] = ${value}` });
    const vals = verPila(nuevos, nuevoTope);
    setLabelMessage(`Push: ${value} → datos[${nuevoTope}] (tope: ${tope} → ${nuevoTope})`);
    setStatusMessage(`Pila: [${vals.join(', ')}] (${nuevoTope + 1}/10)`);
    pushLog(`push(${value}): tope ${tope}→${nuevoTope}, datos[${nuevoTope}]=${value}`, `Pila: [${vals.join(', ')}] (tope=${nuevoTope})`, 'PUSH');
  };

  // 2) POP MANUAL (sin pop nativo): leer, vaciar, tope-1
  const handlePop = () => {
    // PASO 1: ¿Hay algo? tope >= 0. Si no, UNDERFLOW.
    if (tope < 0) {
      setLastAction('UNDERFLOW');
      setTrace(null);
      setLabelMessage('UNDERFLOW: vacía (tope=-1), nada que sacar');
      setStatusMessage('Pila: [] (0/10)');
      pushLog('pop() en pila vacía', 'UNDERFLOW ignorado (tope=-1)', 'POP');
      return;
    }
    const popped = datos[tope]!;
    const nuevos = [...datos];
    nuevos[tope] = null; // vaciar casilla, SIN pop nativo
    const nuevoTope = tope - 1;
    setDatos(nuevos);
    setTope(nuevoTope);
    setLastAction('POP');
    setLastPoppedValue(popped.value);
    setTrace({ from: tope, to: nuevoTope, slot: tope, op: `datos[${tope}] liberada (${popped.value})` });
    const vals = verPila(nuevos, nuevoTope);
    setLabelMessage(`Pop: salió ${popped.value} de datos[${tope}] (tope: ${tope} → ${nuevoTope})`);
    setStatusMessage(`Pila: [${vals.join(', ')}] (${nuevoTope + 1}/10)`);
    pushLog(`pop(): leyó datos[${tope}]=${popped.value}, tope ${tope}→${nuevoTope}`, `Restante: [${vals.join(', ')}] (tope=${nuevoTope})`, 'POP');
  };

  // 3) TOP: solo lee datos[tope], no mueve el puntero
  const handleTop = () => {
    if (tope < 0) {
      setLastAction('TOP_EMPTY');
      setTrace(null);
      setLabelMessage('Top: vacía (tope=-1, sin cima)');
      setStatusMessage('Top: null');
      pushLog('top() en pila vacía', 'Sin cima (tope=-1)', 'TOP');
      return;
    }
    const topVal = datos[tope]!.value;
    setLastAction('TOP');
    setTrace({ from: tope, to: tope, slot: tope, op: `lee datos[${tope}] = ${topVal} (no borra)` });
    setLabelMessage(`Top: datos[${tope}] = ${topVal} (solo mira, no borra)`);
    setStatusMessage(`El último en entrar fue: ${topVal} (tope=${tope})`);
    pushLog('top() consultado', `Cima = datos[${tope}] = ${topVal} (sin eliminar)`, 'TOP');
  };

  // 4) EMPTY: vacía <=> tope == -1
  const handleEmpty = () => {
    setLastAction('EMPTY');
    setTrace(null);
    if (tope === -1) {
      setLabelMessage('Pila vacía (tope=-1)');
      setStatusMessage('Estado: tope == -1 (True)');
    } else {
      setLabelMessage(`Pila no vacía: ${count}/10 elementos (tope=${tope})`);
      setStatusMessage(`Estado: tope != -1 → hay ${count} elementos`);
    }
    pushLog('empty() comprobado', tope === -1 ? 'Vacía (tope=-1)' : `No vacía (${count}/10, tope=${tope})`, 'EMPTY');
  };

  const handleResetStack = () => {
    setDatos(new Array(MAX).fill(null));
    setTope(-1);
    setTrace(null);
    setLabelMessage('Pila vaciada: tope=-1, 10 casillas libres');
    setStatusMessage('Pila: [] (0/10)');
    setLastPoppedValue(null);
    setLastAction('RESET');
  };

  const handlePushCustom = () => {
    const num = parseInt(customValue);
    if (!isNaN(num)) {
      handlePush(num);
      setCustomValue('');
    }
  };

  // Índices de arriba (9) hacia abajo (0) para dibujar la torre
  const visualIndices = Array.from({ length: MAX }, (_, k) => MAX - 1 - k);

  return (
    <div className="space-y-8">
      {/* Intro card for Fabrix */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 mb-2">
          <Layers className="w-3.5 h-3.5" /> Tema 3 • Pila MANUAL (arreglo fijo + puntero)
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Pilas (Stack — Estructura LIFO manual)
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          ¡Hola Fabrix! Esta pila <strong>NO usa <code>append</code> ni <code>pop</code></strong>. Es un{' '}
          <span className="font-semibold text-emerald-800">arreglo fijo de 10 casillas</span> (<code>datos[0..9]</code>) más un{' '}
          <span className="font-semibold text-emerald-800">puntero <code>tope</code></span> que siempre apunta a la cima:{' '}
          <code>tope = -1</code> significa vacía, <code>tope = 9</code> significa llena (10/10). Push sube el puntero y escribe;
          pop lee, vacía y baja el puntero.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono">
          <span className="px-2 py-1 rounded bg-slate-900 text-amber-300">MAX = 10</span>
          <span className="px-2 py-1 rounded bg-slate-900 text-sky-300">datos = [None × 10]</span>
          <span className="px-2 py-1 rounded bg-slate-900 text-emerald-300">tope = {tope} ({count}/10)</span>
          <span className="px-2 py-1 rounded bg-red-100 text-red-800 border border-red-200">⛔ append / pop prohibidos</span>
        </div>
      </div>

      {/* Cómo funciona el puntero: explicación animada paso a paso */}
      <div className="bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 p-5 md:p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MousePointer2 className="w-4 h-4 text-amber-400" /> ¿Cómo funciona el puntero <code className="text-amber-300">tope</code>? — Animación en vivo
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Haz Push / Pop a la derecha y mira cómo la flecha <span className="text-amber-300 font-bold">👈 TOPE</span> sube y baja.
          Cada operación deja su rastro abajo (<code>tope: a → b</code>).
        </p>
        {trace ? (
          <div key={`${trace.from}-${trace.to}-${trace.slot}-${lastAction}`} className="mt-3 p-3 rounded-xl bg-slate-900 border border-amber-500/40 font-mono text-xs animate-pulse">
            <span className="text-slate-400">Rastro: </span>
            <span className="text-amber-300 font-bold">tope: {trace.from} → {trace.to}</span>
            <span className="text-slate-300"> · {trace.op}</span>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-500">
            Rastro: presiona Push o Pop y aquí verás cómo se mueve el puntero (ej. <span className="text-slate-300">tope: 2 → 3 · datos[3] = 57</span>).
          </div>
        )}
        <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs leading-relaxed">
          <li className="p-3 rounded-xl bg-slate-900 border border-slate-800"><strong className="text-sky-300">PASO 0 — Nace vacía:</strong> <code>datos = [vacío × 10]</code>, <code>tope = -1</code>. La flecha no apunta a nada.</li>
          <li className="p-3 rounded-xl bg-slate-900 border border-slate-800"><strong className="text-sky-300">PUSH 1/3 — ¿Cabe?:</strong> si <code>tope &lt; 9</code> hay espacio. Si <code>tope == 9</code> → <span className="text-rose-300 font-bold">OVERFLOW</span> (llena 10/10).</li>
          <li className="p-3 rounded-xl bg-slate-900 border border-slate-800"><strong className="text-sky-300">PUSH 2/3 — Sube:</strong> <code>tope = tope + 1</code>. La flecha 👈 sube una casilla (ej. -1 → 0).</li>
          <li className="p-3 rounded-xl bg-slate-900 border border-slate-800"><strong className="text-sky-300">PUSH 3/3 — Escribe:</strong> <code>datos[tope] = valor</code>. Asignación directa, sin append.</li>
          <li className="p-3 rounded-xl bg-slate-900 border border-slate-800"><strong className="text-rose-300">POP 1/2 — ¿Hay algo?:</strong> si <code>tope == -1</code> → <span className="font-bold">UNDERFLOW</span> (vacía, nada que sacar).</li>
          <li className="p-3 rounded-xl bg-slate-900 border border-slate-800"><strong className="text-rose-300">POP 2/2 — Lee, vacía y baja:</strong> lee <code>datos[tope]</code>, pon la casilla en vacío y haz <code>tope = tope - 1</code>. La flecha 👇 baja.</li>
        </ol>
        <p className="mt-3 text-[11px] font-mono text-slate-400">
          Fórmulas de oro: <span className="text-emerald-300">elementos = tope + 1</span> · <span className="text-emerald-300">cima = datos[tope]</span> · <span className="text-emerald-300">vacía ⇔ tope == -1</span> · <span className="text-emerald-300">llena ⇔ tope == 9</span>
        </p>
      </div>

      {/* Main dual-panel simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Stack Simulation Container */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Simulador: 10 casillas + puntero TOPE</h3>
              <p className="text-xs text-slate-500">Las casillas grises están vacías (None/null). La flecha ámbar es el puntero.</p>
            </div>
            <button
              type="button"
              onClick={handleResetStack}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Vaciar (tope=-1)
            </button>
          </div>

          {/* Capacidad */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
              <span>Capacidad: {count}/10</span>
              <span>tope = {tope}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${count >= 10 ? 'bg-rose-500' : count >= 8 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${count * 10}%` }}
              />
            </div>
          </div>

          {/* Visual Container: fixed 10 slots */}
          <div className="relative w-full max-w-sm mx-auto bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center overflow-hidden shadow-inner">
            <div className="w-full flex flex-col gap-1.5 z-10">
              {visualIndices.map((i) => {
                const item = datos[i];
                const isTop = i === tope;
                const highlight = trace?.slot === i && (lastAction === 'PUSH' || lastAction === 'POP' || lastAction === 'TOP');
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-8 text-right font-mono text-[10px] text-slate-500">[{i}]</span>
                    <div
                      className={`flex-1 py-1.5 px-3 rounded-lg border flex items-center justify-between font-mono font-bold text-xs shadow transition-all duration-500 transform ${
                        item
                          ? `${item.color} ${isTop ? 'ring-2 ring-amber-300 scale-[1.03]' : 'opacity-90'}`
                          : 'bg-slate-900 border-dashed border-slate-700 text-slate-600 font-normal'
                      } ${highlight ? 'animate-pulse ring-2 ring-amber-300' : ''}`}
                    >
                      {item ? (
                        <>
                          <span>Valor: {item.value}</span>
                          {isTop && (
                            <span className="text-[10px] uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded font-bold">
                              Cima
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px]">vacía (None)</span>
                      )}
                    </div>
                    <span className={`w-20 text-left font-mono text-[11px] font-bold transition-all duration-500 ${isTop ? 'text-amber-400 animate-pulse' : 'text-transparent'}`}>
                      {isTop ? '👈 TOPE' : '·'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Base platform */}
            <div className="w-full text-center font-mono text-[10px] text-slate-500 mt-3">
              {tope === -1 ? '👆 tope = -1 → pila vacía (flecha sin casilla)' : `👆 tope = ${tope} → cima = datos[${tope}]`}
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-b-lg border-t border-slate-700 mt-1"></div>
          </div>

          {/* Overflow / Underflow banners */}
          {lastAction === 'OVERFLOW' && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs flex items-center gap-2 text-rose-900">
              <Ban className="w-4 h-4 shrink-0" />
              <span><strong>OVERFLOW:</strong> intentaste Push con 10/10 lleno (tope=9). El dato se rechaza, el puntero NO se mueve.</span>
            </div>
          )}
          {lastAction === 'UNDERFLOW' && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs flex items-center gap-2 text-rose-900">
              <Ban className="w-4 h-4 shrink-0" />
              <span><strong>UNDERFLOW:</strong> intentaste Pop con tope=-1 (vacía). No hay casilla que leer, el puntero NO se mueve.</span>
            </div>
          )}

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
                Pila: [{verPila(datos, tope).join(', ')}] (tope={tope})
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
                disabled={tope >= MAX - 1}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-sky-200 hover:bg-sky-300 text-sky-950 border border-sky-300 shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowDown className="w-3.5 h-3.5 text-sky-800" />
                <span>b1: Push (1-100)</span>
              </button>

              {/* Button 2: Pop */}
              <button
                id="btn-pop"
                type="button"
                onClick={handlePop}
                disabled={tope < 0}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-rose-200 hover:bg-rose-300 text-rose-950 border border-rose-300 shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
                disabled={tope >= MAX - 1}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 shrink-0 cursor-pointer disabled:opacity-40"
              >
                Push manual
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Push deshabilitado en 10/10 (OVERFLOW) · Pop deshabilitado en tope=-1 (UNDERFLOW)
            </p>
          </div>

          {/* Educational Concept Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Reglas de Oro de la Pila MANUAL
            </h4>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>LIFO + arreglo fijo:</strong> solo se entra y sale por la cima (<code>datos[tope]</code>). No puedes sacar <code>datos[0]</code> sin antes bajar el puntero con pops.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Top vs. Pop:</strong> <code>top()</code> solo lee <code>datos[tope]</code> (el puntero quieto). <code>pop()</code> lee, vacía la casilla y hace <code>tope - 1</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Dos guardias, no una:</strong> <code>tope &lt; 9</code> antes de push (anti-OVERFLOW) y <code>tope &gt;= 0</code> antes de pop/top (anti-UNDERFLOW). Sin <code>append</code> ni <code>pop</code> nativos.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Programa documentado paso a paso */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Programa documentado paso a paso (estructura manual)</h3>
        <p className="text-xs text-slate-500 mb-4">
          El mismo código del visor de abajo, explicado por bloques. Léelo en orden: primero nace la estructura, luego cada operación mueve el puntero.
        </p>
        <ol className="space-y-2 text-xs text-slate-600 leading-relaxed list-decimal list-inside">
          <li><strong>PASO 0 — Estructura:</strong> <code>MAX = 10</code>, <code>datos = [None] * 10</code> (10 casillas fijas) y <code>tope = -1</code> (puntero a la cima). Nada crece solo.</li>
          <li><strong>PASO 1 — Push, guardia:</strong> <code>if tope &lt; MAX - 1</code>. Si es falso (tope == 9) → OVERFLOW: pila llena, se rechaza el valor.</li>
          <li><strong>PASO 2 — Push, subir:</strong> <code>tope = tope + 1</code>. El puntero sube a la primera casilla libre.</li>
          <li><strong>PASO 3 — Push, escribir:</strong> <code>datos[tope] = valor</code>. Asignación directa al índice, prohibido <code>append</code>.</li>
          <li><strong>PASO 4 — Pop, guardia:</strong> <code>if tope &gt;= 0</code>. Si es falso (tope == -1) → UNDERFLOW: vacía, nada que sacar.</li>
          <li><strong>PASO 5 — Pop, leer + vaciar + bajar:</strong> <code>valor = datos[tope]</code>, luego <code>datos[tope] = None</code> y <code>tope = tope - 1</code>. Prohibido <code>pop()</code> nativo.</li>
          <li><strong>PASO 6 — Top y Empty (solo miran):</strong> <code>top</code> retorna <code>datos[tope]</code> sin mover nada; <code>empty</code> responde <code>tope == -1</code>. Elementos = <code>tope + 1</code>.</li>
        </ol>
      </div>

      {/* Flowcharts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Diagramas de Flujo: Push y Pop manuales</h3>
        <p className="text-xs text-slate-500 mb-4">
          Fíjate en los rombos: push pregunta <code>¿tope &lt; 9?</code> (anti-OVERFLOW) y pop pregunta <code>¿tope &gt;= 0?</code> (anti-UNDERFLOW). El puntero solo se mueve si la respuesta es SÍ.
        </p>
        <FlowchartSVG type="stack-operations" />
      </div>

      {/* Code Implementations */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-2">Código Fuente Comentado: Python (Tkinter) vs JavaScript</h3>
        <p className="text-xs text-slate-500 mb-4">
          Implementación manual con la clase <code>App</code>: arreglo fijo de 10 + puntero <code>tope</code>, sin <code>append</code> ni <code>pop</code> nativos.
        </p>
        <CodeViewer example={stackCode} defaultLang="python" />
      </div>

      {/* Mini-Quiz */}
      <QuizCard
        title="Mini-Examen: Pilas manuales (Stack - LIFO)"
        subtitle="Verifica que dominas el arreglo fijo, el puntero tope, overflow, underflow y la condición de pila vacía."
        questions={stackQuiz}
      />
    </div>
  );
};
