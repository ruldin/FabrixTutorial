export type TopicId = 'matrices' | 'sorting' | 'stack' | 'exam';

export type Language = 'python' | 'javascript';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface MatrixStep {
  stepIndex: number;
  description: string;
  activeI: number;
  activeJ: number;
  activeK?: number; // for multiplication dot product
  calcText: string;
  resultMatrix: number[][];
  subCalculations?: { aVal: number; bVal: number; prod: number }[];
  currentSum?: number;
}

export interface SortStep {
  stepIndex: number;
  array: number[];
  i: number;
  j: number;
  key: number;
  action: 'select-key' | 'compare' | 'shift' | 'insert' | 'done';
  description: string;
  sortedUpTo: number;
  comparingIndices?: [number, number];
}

export interface StackItem {
  id: string;
  value: number;
  color: string;
}

export interface StackLog {
  timestamp: string;
  action: 'PUSH' | 'POP' | 'TOP' | 'EMPTY';
  detail: string;
  result: string;
}
