import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

interface QuizCardProps {
  title: string;
  subtitle?: string;
  questions: QuizQuestion[];
}

export const QuizCard: React.FC<QuizCardProps> = ({ title, subtitle, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeHints, setActiveHints] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleHint = (questionId: string) => {
    setActiveHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setActiveHints({});
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = questions.length;
  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 md:p-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-1.5">
            <Award className="w-3.5 h-3.5" /> Mini-Examen para Fabrix
          </div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          {showResults && (
            <div className="text-right">
              <span className={`text-sm font-bold ${percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {score} / {totalQuestions} ({percentage}%)
              </span>
            </div>
          )}
          {showResults && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reintentar
            </button>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isSelected = selectedAnswers[q.id] !== undefined;
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-rose-200 bg-rose-50/40'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="text-sm font-semibold text-slate-800">
                  <span className="text-indigo-600 mr-1.5">#{qIndex + 1}.</span> {q.question}
                </h4>
                {q.hint && !showResults && (
                  <button
                    type="button"
                    onClick={() => toggleHint(q.id)}
                    className="shrink-0 inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-medium cursor-pointer"
                    title="Ver pista"
                  >
                    <HelpCircle className="w-3.5 h-3.5" /> Pista
                  </button>
                )}
              </div>

              {activeHints[q.id] && !showResults && (
                <div className="mb-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  💡 <span className="font-semibold">Pista:</span> {q.hint}
                </div>
              )}

              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isOptionSelected = userChoice === optIndex;
                  const isThisCorrect = optIndex === q.correctIndex;

                  let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                  if (showResults) {
                    if (isThisCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-semibold';
                    } else if (isOptionSelected && !isThisCorrect) {
                      optionStyle = 'border-rose-400 bg-rose-100/70 text-rose-950';
                    } else {
                      optionStyle = 'border-slate-200 bg-white opacity-50 text-slate-500';
                    }
                  } else if (isOptionSelected) {
                    optionStyle = 'border-indigo-600 bg-indigo-50/90 text-indigo-950 font-medium ring-1 ring-indigo-500';
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                      {showResults && isOptionSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {showResults && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                    isCorrect ? 'bg-emerald-100/60 text-emerald-900' : 'bg-rose-100/60 text-rose-950'
                  }`}
                >
                  <p className="font-semibold mb-0.5">{isCorrect ? '🎯 ¡Respuesta Correcta!' : '⚠️ Explicación:'}</p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action button */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          {!showResults
            ? `Has respondido ${answeredCount} de ${totalQuestions} preguntas`
            : percentage >= 70
            ? '¡Excelente trabajo Fabrix! Has aprobado este examen con éxito 🚀'
            : '¡Buen intento Fabrix! Repasa los conceptos y dale a reintentar para mejorar tu calificación.'}
        </p>

        {!showResults ? (
          <button
            type="button"
            disabled={answeredCount === 0}
            onClick={() => setShowResults(true)}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm cursor-pointer ${
              answeredCount > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Calificar Mini-Examen
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm cursor-pointer"
          >
            Hacer el examen de nuevo
          </button>
        )}
      </div>
    </div>
  );
};
