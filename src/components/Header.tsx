import React from 'react';
import { TopicId } from '../types';
import { Grid3X3, ArrowUpDown, Layers, Award, Sparkles, GraduationCap } from 'lucide-react';

interface HeaderProps {
  activeTopic: TopicId;
  onSelectTopic: (topic: TopicId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTopic, onSelectTopic }) => {
  const tabs: { id: TopicId; label: string; icon: React.ReactNode; number: string }[] = [
    {
      id: 'matrices',
      label: 'Matrices (Suma y Mult.)',
      icon: <Grid3X3 className="w-4 h-4" />,
      number: '1',
    },
    {
      id: 'sorting',
      label: 'Ordenamiento por Inserción',
      icon: <ArrowUpDown className="w-4 h-4" />,
      number: '2',
    },
    {
      id: 'stack',
      label: 'Pilas (Stack LIFO)',
      icon: <Layers className="w-4 h-4" />,
      number: '3',
    },
    {
      id: 'exam',
      label: 'Mini-Examen & Guía',
      icon: <Award className="w-4 h-4" />,
      number: '4',
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top greeting bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Tutorial y Guía de Programación
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> Para Fabrix
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Nivel Secundaria • Simulación interactiva paso a paso en Python y JavaScript
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
              Sin Login • Acceso Público
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar" aria-label="Temas">
          {tabs.map((tab) => {
            const isActive = activeTopic === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTopic(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.number}
                </span>
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
