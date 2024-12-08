export type CommandType = 'ADD_SOLVER' | 'ADD_DATASET' | 'USE_SOLVER' | 'USE_DATASET';

export interface Command {
  type: CommandType;
  label: string;
  description: string;
  icon: string;
}

export const AVAILABLE_COMMANDS: Command[] = [
  {
    type: 'ADD_SOLVER',
    label: 'Add Solver',
    description: 'Transform your existing solver to match our guidelines',
    icon: 'Code'
  },
  {
    type: 'ADD_DATASET',
    label: 'Add Dataset',
    description: 'Upload a QUBO matrix from .npy or .xlsx file',
    icon: 'Database'
  },
  {
    type: 'USE_SOLVER',
    label: 'Use Solver',
    description: 'Select and configure an existing solver',
    icon: 'Play'
  },
  {
    type: 'USE_DATASET',
    label: 'Use Dataset',
    description: 'Select an existing dataset',
    icon: 'Table'
  }
];