# QUBO Optimizer Pro

**QUBO Optimizer Pro** is a project aimed at solving Quadratic Unconstrained Binary Optimization (QUBO) problems using efficient algorithms and a modern web interface. QUBO problems are widely used in combinatorial optimization, machine learning, and quantum computing.

## Features

- **Interactive User Interface:** Built with React and styled with Tailwind CSS for modern and responsive UI design.
- **Optimized Backend Logic:** Supports solving QUBO problems with a robust Python backend.
- **Fast Development Workflow:** Powered by Vite for efficient builds and hot module replacement.
- **Type Safety:** Written in TypeScript for a robust and maintainable codebase.

## Technology Stack

### Frontend
- **React:** Component-based UI library.
- **Tailwind CSS:** Utility-first CSS framework.
- **TypeScript:** Ensures strong typing and scalable development.
- **Vite:** High-performance build tool for web projects.

### Backend
- **Python:** Used for solving QUBO problems and interacting with optimization libraries.
- **Dependencies:** Managed with `requirements.txt` for Python-based modules.

## Installation

To run the project locally, ensure you have the following installed:
- **Node.js:** Recommended version 16+.
- **npm or yarn:** For managing JavaScript dependencies.
- **Python:** Version 3.8 or higher.

### Steps

1. Clone the repository:
   ```bash
   git clone <YOUR_GIT_URL>
   cd qubo-optimizer-pro
   git clone https://github.com/leonidas1312/qubo-optimizer-pro
2. Run the backend server using fastAPI:
   ```bash
   pip install -r requirements.txt
   python setup.py
   pip install -e .
   python src/backend/main.py
3. Run the frontend of the app:
   ```bash
   npm i
   npm run dev


