import React, { useState } from 'react';
import { Check, Copy, Terminal, Code2 } from 'lucide-react';
import { CodeExample } from '../data/codeSnippets';
import { Language } from '../types';

interface CodeViewerProps {
  example: CodeExample;
  defaultLang?: Language;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ example, defaultLang = 'python' }) => {
  const [activeTab, setActiveTab] = useState<'python' | 'javascript' | 'pseudocode'>(defaultLang);
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (activeTab) {
      case 'python':
        return example.python;
      case 'javascript':
        return example.javascript;
      case 'pseudocode':
        return example.pseudocode;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden text-slate-100">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" />
            {example.title}
          </span>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('pseudocode')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'pseudocode'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            📋 Pseudocódigo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('python')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'python'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            🐍 Python
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('javascript')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'javascript'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            🟨 JavaScript
          </button>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition border border-slate-700 cursor-pointer"
          title="Copiar código al portapapeles"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>

      {/* Code view */}
      <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
        <pre className="text-slate-200">
          <code>{getCode()}</code>
        </pre>
      </div>

      {/* Key notes for student */}
      {example.keyDifferences.length > 0 && (
        <div className="px-4 py-3 bg-slate-950/90 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1.5">
            <Code2 className="w-3.5 h-3.5" />
            <span>Notas clave para Fabrix (Python vs. JavaScript):</span>
          </div>
          <ul className="space-y-1 text-slate-300 list-disc list-inside">
            {example.keyDifferences.map((diff, index) => (
              <li key={index} className="text-slate-300">
                {diff}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
