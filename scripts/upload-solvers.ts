import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const solverFiles = [
  {
    path: '../src/algorithms/genetic_algorithm.py',
    name: 'Genetic Algorithm',
    description: 'A genetic algorithm implementation for QUBO problem solving'
  },
  {
    path: '../src/algorithms/simulated_annealing.py',
    name: 'Simulated Annealing',
    description: 'A simulated annealing implementation for QUBO problem solving'
  },
  {
    path: '../src/algorithms/tabu_search.py',
    name: 'Tabu Search',
    description: 'A tabu search implementation for QUBO problem solving'
  }
];

async function uploadSolvers() {
  for (const solver of solverFiles) {
    try {
      const fileContent = fs.readFileSync(path.resolve(__dirname, solver.path), 'utf-8');
      
      const response = await fetch(`${supabaseUrl}/functions/v1/upload-guideline-solver`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: solver.name,
          description: solver.description,
          fileContent
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${solver.name}: ${await response.text()}`);
      }

      console.log(`Successfully uploaded ${solver.name}`);
    } catch (error) {
      console.error(`Error uploading ${solver.name}:`, error);
    }
  }
}

uploadSolvers().catch(console.error);