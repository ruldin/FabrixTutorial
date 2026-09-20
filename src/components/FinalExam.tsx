import React, { useState } from 'react';
import { finalExamQuestions } from '../data/quizData';
import { QuizQuestion } from '../types';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, Star } from 'lucide-react';

export const FinalExam: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (qId: string, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    finalExamQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const total = finalExamQuestions.length;
  const score = calculateScore();
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 80;

  return (
    <div className="space-y-8">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-sky-50 border border-purple-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 mb-2">
          <Award className="w-3.5 h-3.5" /> Examen de Certificación y Repaso
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Examen General de Programación para Fabrix
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Este examen evalúa los 3 ejercicios clave de tu programa de estudio: <strong>Manejo de Matrices</strong>, 
          <strong>Ordenamiento por Inserción</strong> y la estructura de datos <strong>Pila (Stack LIFO)</strong>.
          ¡Responde con calma y pon a prueba todo lo que aprendiste!
        </p>
      </div>

      {/* Diploma Card if passed */}
      {submitted && isPassed && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-indigo-500/10 border-2 border-amber-300 text-center space-y-3 shadow-md animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-100">
            <Star className="w-8 h-8 fill-amber-500" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            🎉 ¡Felicidades Fabrix! Has aprobado con {percentage}% ({score}/{total})
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Has demostrado un excelente entendimiento de matrices bidimensionales, algoritmos de ordenamiento y estructuras de datos tipo Pila. 
            ¡Estás 100% listo para tu examen de secundaria!
          </p>
        </div>
      )}

      {/* Quiz container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {submitted ? 'Resultados del Examen' : `Preguntas contestadas: ${Object.keys(selectedAnswers).length} de ${total}`}
          </span>
          {submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reintentar examen
            </button>
          )}
        </div>

        <div className="space-y-6">
          {finalExamQuestions.map((q: QuizQuestion, index: number) => {
            const userChoice = selectedAnswers[q.id];
            const isAnswered = userChoice !== undefined;
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-all ${
                  submitted
                    ? isCorrect
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-rose-200 bg-rose-50/40'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-sm font-semibold text-slate-900">
                    <span className="text-indigo-600 mr-1.5 font-mono">#{index + 1}.</span> {q.question}
                  </h4>
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = userChoice === optIdx;
                    const isThisCorrect = optIdx === q.correctIndex;

                    let style = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                    if (submitted) {
                      if (isThisCorrect) {
                        style = 'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-semibold';
                      } else if (isOptionSelected && !isThisCorrect) {
                        style = 'border-rose-400 bg-rose-100/70 text-rose-950';
                      } else {
                        style = 'border-slate-200 bg-white opacity-50 text-slate-500';
                      }
                    } else if (isOptionSelected) {
                      style = 'border-indigo-600 bg-indigo-50/90 text-indigo-950 font-medium ring-1 ring-indigo-500';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition cursor-pointer ${style}`}
                      >
                        <span>{opt}</span>
                        {submitted && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                        {submitted && isOptionSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-100/60 text-emerald-900' : 'bg-rose-100/60 text-rose-950'
                    }`}
                  >
                    <p className="font-semibold mb-0.5">{isCorrect ? '🎯 ¡Correcto!' : '💡 Retroalimentación:'}</p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {!submitted
              ? `Asegúrate de marcar todas las preguntas antes de calificar.`
              : `Obtuviste ${score} de ${total} aciertos.`}
          </p>

          {!submitted ? (
            <button
              type="button"
              disabled={Object.keys(selectedAnswers).length < total}
              onClick={() => setSubmitted(true)}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer ${
                Object.keys(selectedAnswers).length === total
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Enviar y Calificar Examen
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm cursor-pointer"
            >
              Hacer examen de nuevo
            </button>
          )}
        </div>
      </div>

      {/* Cheatsheet summary table requested in prompt */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Tabla Resumen de Algoritmos (Guía de Estudio)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">#</th>
                <th className="p-3">Tema</th>
                <th className="p-3">Regla Principal</th>
                <th className="p-3">Python</th>
                <th className="p-3">JavaScript</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-mono font-bold text-slate-400">1</td>
                <td className="p-3 font-semibold text-sky-800">Matrices (Suma y Mult.)</td>
                <td className="p-3">Suma requiere dimensiones iguales. Mult requiere cols(A) == filas(B).</td>
                <td className="p-3 font-mono text-[11px] text-slate-600">[[random.randint(1,10) for _ in range(c)] for _ in range(f)]</td>
                <td className="p-3 font-mono text-[11px] text-slate-600">matriz[i][j] = Math.floor(Math.random()*10)+1</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-400">2</td>
                <td className="p-3 font-semibold text-amber-800">Ordenamiento por Inserción</td>
                <td className="p-3">Guarda la clave temporal y desplaza a la derecha con <code>while j &gt;= 0</code>.</td>
                <td className="p-3 font-mono text-[11px] text-slate-600">vector[j + 1] = vector[j]; j -= 1</td>
                <td className="p-3 font-mono text-[11px] text-slate-600">vector[j + 1] = vector[j]; j--</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-400">3</td>
                <td className="p-3 font-semibold text-emerald-800">Pilas (Stack LIFO)</td>
                <td className="p-3">Last-In, First-Out. Push agrega a la cima, Pop retira de la cima.</td>
                <td className="p-3 font-mono text-[11px] text-slate-600">pila.append(x) / pila.pop() / pila[-1]</td>
                <td className="p-3 font-mono text-[11px] text-slate-600">pila.push(x) / pila.pop() / pila[length-1]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
