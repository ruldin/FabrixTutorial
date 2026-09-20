import React, { useState } from 'react';
import { TopicId } from './types';
import { Header } from './components/Header';
import { MatrixTopic } from './components/MatrixTopic';
import { SortingTopic } from './components/SortingTopic';
import { StackTopic } from './components/StackTopic';
import { FinalExam } from './components/FinalExam';
import { BookOpen, CheckCircle, Heart, Sparkles, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTopic, setActiveTopic] = useState<TopicId>('matrices');

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Personalized Header */}
      <Header activeTopic={activeTopic} onSelectTopic={setActiveTopic} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTopic === 'matrices' && <MatrixTopic />}
        {activeTopic === 'sorting' && <SortingTopic />}
        {activeTopic === 'stack' && <StackTopic />}
        {activeTopic === 'exam' && <FinalExam />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">Guía de Estudio de Programación para Fabrix</span>
            <span>• Secundaria</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <button
              type="button"
              onClick={() => setActiveTopic('matrices')}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              1. Matrices
            </button>
            <button
              type="button"
              onClick={() => setActiveTopic('sorting')}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              2. Inserción
            </button>
            <button
              type="button"
              onClick={() => setActiveTopic('stack')}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              3. Pilas (LIFO)
            </button>
            <button
              type="button"
              onClick={() => setActiveTopic('exam')}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              4. Mini-Examen
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Diseñado con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para el aprendizaje óptimo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
