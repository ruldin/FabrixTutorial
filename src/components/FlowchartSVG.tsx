import React from 'react';

interface FlowchartProps {
  type: 'matrices-addition' | 'matrices-multiplication' | 'insertion-sort' | 'stack-operations';
  activeStep?: string;
}

export const FlowchartSVG: React.FC<FlowchartProps> = ({ type }) => {
  if (type === 'matrices-addition') {
    return (
      <div className="w-full overflow-x-auto py-3">
        <svg viewBox="0 0 760 380" className="w-full max-w-2xl mx-auto font-sans text-xs">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
            </marker>
          </defs>

          {/* Start */}
          <rect x="290" y="10" width="180" height="36" rx="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="380" y="33" textAnchor="middle" className="font-semibold fill-sky-900">Inicio: Leer filas y cols</text>

          <line x1="380" y1="46" x2="380" y2="70" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Condition: Equal dimensions? */}
          <polygon points="380,72 490,110 380,148 270,110" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="380" y="106" textAnchor="middle" className="font-medium fill-amber-900">¿Dimensiones A == B?</text>
          <text x="380" y="122" textAnchor="middle" className="text-[10px] fill-amber-700">(filas y columnas iguales)</text>

          {/* No branch */}
          <line x1="490" y1="110" x2="600" y2="110" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="530" y="102" className="text-[11px] font-bold fill-red-600">NO</text>
          <rect x="600" y="90" width="130" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
          <text x="665" y="115" textAnchor="middle" className="fill-red-800 font-medium">Error: Incompatible</text>

          {/* Yes branch */}
          <line x1="380" y1="148" x2="380" y2="180" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="390" y="166" className="text-[11px] font-bold fill-emerald-600">SÍ</text>

          {/* Loop i */}
          <rect x="290" y="180" width="180" height="36" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <text x="380" y="203" textAnchor="middle" className="font-medium fill-slate-800">Para cada fila i (0 a filas-1)</text>

          <line x1="380" y1="216" x2="380" y2="242" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Loop j */}
          <rect x="280" y="242" width="200" height="36" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <text x="380" y="265" textAnchor="middle" className="font-medium fill-slate-800">Para cada columna j (0 a cols-1)</text>

          <line x1="380" y1="278" x2="380" y2="304" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Action: Sum */}
          <rect x="260" y="304" width="240" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="380" y="328" textAnchor="middle" className="font-semibold fill-emerald-900">C[i][j] = A[i][j] + B[i][j]</text>

          {/* Loop back arrows */}
          <path d="M 260 323 L 230 323 L 230 198 L 290 198" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrow)" />
          <text x="215" y="255" textAnchor="middle" className="text-[10px] fill-slate-500 -rotate-90">Siguiente celda</text>

          {/* End */}
          <line x1="500" y1="323" x2="560" y2="323" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <rect x="560" y="305" width="140" height="36" rx="18" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="630" y="328" textAnchor="middle" className="font-medium fill-indigo-900">Retornar Matriz C</text>
        </svg>
      </div>
    );
  }

  if (type === 'matrices-multiplication') {
    return (
      <div className="w-full overflow-x-auto py-3">
        <svg viewBox="0 0 760 410" className="w-full max-w-2xl mx-auto font-sans text-xs">
          <defs>
            <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
            </marker>
          </defs>

          {/* Start */}
          <rect x="290" y="10" width="180" height="34" rx="17" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="380" y="32" textAnchor="middle" className="font-semibold fill-sky-900">Multiplicar A (m×k) × B (k×n)</text>

          <line x1="380" y1="44" x2="380" y2="68" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          {/* Condition: colsA == filasB */}
          <polygon points="380,70 490,105 380,140 270,105" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="380" y="100" textAnchor="middle" className="font-medium fill-amber-900">¿cols(A) == filas(B)?</text>
          <text x="380" y="118" textAnchor="middle" className="text-[10px] fill-amber-700">Dimensión compartida (k)</text>

          {/* Error */}
          <line x1="490" y1="105" x2="590" y2="105" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <text x="525" y="98" className="text-[11px] font-bold fill-red-600">NO</text>
          <rect x="590" y="88" width="140" height="36" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
          <text x="660" y="111" textAnchor="middle" className="fill-red-800 font-medium">Incompatible</text>

          {/* Yes branch */}
          <line x1="380" y1="140" x2="380" y2="170" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <text x="390" y="158" className="text-[11px] font-bold fill-emerald-600">SÍ</text>

          {/* 3 Nested Loops */}
          <rect x="290" y="170" width="180" height="32" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <text x="380" y="191" textAnchor="middle" className="font-medium fill-slate-800">1. Para i de 0 a filas(A)-1</text>

          <line x1="380" y1="202" x2="380" y2="225" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          <rect x="275" y="225" width="210" height="32" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <text x="380" y="246" textAnchor="middle" className="font-medium fill-slate-800">2. Para j de 0 a cols(B)-1 (suma=0)</text>

          <line x1="380" y1="257" x2="380" y2="280" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          <rect x="260" y="280" width="240" height="32" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="380" y="301" textAnchor="middle" className="font-medium fill-purple-900">3. Para k de 0 a cols(A)-1</text>

          <line x1="380" y1="312" x2="380" y2="335" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          {/* Accumulate */}
          <rect x="240" y="335" width="280" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="380" y="358" textAnchor="middle" className="font-semibold fill-emerald-900">suma = suma + (A[i][k] * B[k][j])</text>

          {/* Finish cell */}
          <line x1="520" y1="354" x2="570" y2="354" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <rect x="570" y="335" width="160" height="38" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="650" y="358" textAnchor="middle" className="font-medium fill-yellow-900">C[i][j] = suma acumulada</text>
        </svg>
      </div>
    );
  }

  if (type === 'insertion-sort') {
    return (
      <div className="w-full overflow-x-auto py-3">
        <svg viewBox="0 0 760 420" className="w-full max-w-2xl mx-auto font-sans text-xs">
          <defs>
            <marker id="arrow3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
            </marker>
          </defs>

          {/* Start */}
          <rect x="290" y="10" width="180" height="34" rx="17" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="380" y="32" textAnchor="middle" className="font-semibold fill-sky-900">Inicio: Vector desordenado</text>

          <line x1="380" y1="44" x2="380" y2="70" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow3)" />

          {/* Outer loop: for i from 1 to n-1 */}
          <rect x="270" y="70" width="220" height="36" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
          <text x="380" y="93" textAnchor="middle" className="font-medium fill-slate-800">Para i = 1 hasta n - 1 (Recorrido)</text>

          <line x1="380" y1="106" x2="380" y2="132" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow3)" />

          {/* Take key & j = i - 1 */}
          <rect x="250" y="132" width="260" height="36" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="380" y="155" textAnchor="middle" className="font-semibold fill-amber-900">clave = vector[i]  |  j = i - 1</text>

          <line x1="380" y1="168" x2="380" y2="198" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow3)" />

          {/* Condition: j >= 0 and vector[j] > clave */}
          <polygon points="380,198 520,240 380,282 240,240" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <text x="380" y="235" textAnchor="middle" className="font-medium fill-purple-900">¿j ≥ 0 Y vector[j] &gt; clave?</text>
          <text x="380" y="253" textAnchor="middle" className="text-[10px] fill-purple-700">(¿Hay número mayor a la izquierda?)</text>

          {/* Yes: Shift element right */}
          <line x1="240" y1="240" x2="130" y2="240" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow3)" />
          <text x="180" y="232" className="text-[11px] font-bold fill-emerald-600">SÍ</text>

          <rect x="20" y="215" width="110" height="50" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="75" y="237" textAnchor="middle" className="font-semibold fill-emerald-900 text-[11px]">vector[j+1] = vector[j]</text>
          <text x="75" y="253" textAnchor="middle" className="fill-emerald-800 text-[10px]">j = j - 1 (retrocede)</text>

          {/* Loop back to condition */}
          <path d="M 75 215 L 75 180 L 380 180" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrow3)" />

          {/* No: Insert key */}
          <line x1="380" y1="282" x2="380" y2="315" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow3)" />
          <text x="390" y="302" className="text-[11px] font-bold fill-red-600">NO</text>

          <rect x="260" y="315" width="240" height="38" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="380" y="338" textAnchor="middle" className="font-semibold fill-sky-900">vector[j + 1] = clave (Inserta)</text>

          {/* Finish / Next i */}
          <line x1="380" y1="353" x2="380" y2="380" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow3)" />
          <rect x="280" y="380" width="200" height="34" rx="17" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
          <text x="380" y="402" textAnchor="middle" className="font-bold fill-emerald-900">Fin: Vector 100% Ordenado</text>
        </svg>
      </div>
    );
  }

  // Stack operations
  return (
    <div className="w-full overflow-x-auto py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {/* Push Operation */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-sky-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span> Operación 1: push()
          </div>
          <svg viewBox="0 0 320 220" className="w-full font-sans text-xs">
            <defs>
              <marker id="arr-p" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
              </marker>
            </defs>
            <rect x="70" y="10" width="180" height="30" rx="15" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="160" y="30" textAnchor="middle" className="font-medium fill-sky-900">Generar random(1, 100)</text>
            <line x1="160" y1="40" x2="160" y2="65" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-p)" />
            
            <rect x="50" y="65" width="220" height="34" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="160" y="87" textAnchor="middle" className="font-semibold fill-emerald-900">pila.append(valor) / pila.push(valor)</text>
            <line x1="160" y1="99" x2="160" y2="125" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-p)" />

            <rect x="60" y="125" width="200" height="32" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
            <text x="160" y="146" textAnchor="middle" className="fill-slate-800">Actualizar Label: Pila [...]</text>
            <line x1="160" y1="157" x2="160" y2="180" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-p)" />

            <rect x="90" y="180" width="140" height="28" rx="14" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <text x="160" y="199" textAnchor="middle" className="font-medium fill-slate-700">Elemento en Cima</text>
          </svg>
        </div>

        {/* Pop Operation */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Operación 2: pop() (Guard clause)
          </div>
          <svg viewBox="0 0 320 220" className="w-full font-sans text-xs">
            <defs>
              <marker id="arr-pop" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
              </marker>
            </defs>
            <rect x="80" y="10" width="160" height="28" rx="14" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
            <text x="160" y="29" textAnchor="middle" className="font-medium fill-slate-800">Llamada a pop()</text>
            <line x1="160" y1="38" x2="160" y2="60" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-pop)" />

            <polygon points="160,60 230,85 160,110 90,85" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="160" y="89" textAnchor="middle" className="font-medium fill-amber-900 text-[11px]">¿pila no vacía?</text>

            {/* SÍ */}
            <line x1="160" y1="110" x2="160" y2="135" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arr-pop)" />
            <text x="172" y="125" className="text-[10px] font-bold fill-emerald-600">SÍ</text>
            <rect x="45" y="135" width="230" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
            <text x="160" y="156" textAnchor="middle" className="font-semibold fill-rose-900">extraído = pila.pop()</text>

            {/* NO */}
            <line x1="230" y1="85" x2="270" y2="85" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arr-pop)" />
            <text x="240" y="78" className="text-[10px] font-bold fill-red-600">NO</text>
            <rect x="200" y="105" width="110" height="30" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <text x="255" y="124" textAnchor="middle" className="text-[10px] fill-slate-500">Ignorar (vacía)</text>

            <line x1="160" y1="167" x2="160" y2="188" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr-pop)" />
            <rect x="70" y="188" width="180" height="26" rx="13" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
            <text x="160" y="205" textAnchor="middle" className="font-medium fill-emerald-800 text-[11px]">Mostrar valor retirado</text>
          </svg>
        </div>
      </div>
    </div>
  );
};
