import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Database, Cpu, Activity, BookOpen, ExternalLink, FileJson, Server } from "lucide-react";

const Documentation = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              CEPTUM Documentation
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Your comprehensive guide to quantum-inspired optimization
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="solvers">Solvers</TabsTrigger>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="technical">Technical Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Welcome to CEPTUM</h2>
                <p className="text-muted-foreground mb-4">
                  CEPTUM is a cloud-based platform for solving Quadratic Unconstrained Binary Optimization (QUBO) problems. 
                  Whether you're a researcher, data scientist, or industry professional, our platform provides the tools 
                  you need to tackle complex optimization challenges.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Key Features</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Multiple optimization algorithms</li>
                      <li>Cloud-based computation</li>
                      <li>Easy dataset management</li>
                      <li>Real-time visualization</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Getting Started</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Create an account</li>
                      <li>Upload or select a dataset</li>
                      <li>Choose a solver</li>
                      <li>Configure and run</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="solvers" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Available Solvers</h2>
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Activity className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Simulated Annealing</h3>
                        <p className="text-muted-foreground">
                          A probabilistic technique that simulates the physical process of annealing for approximating the global optimum.
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Key Parameters:</strong>
                          <ul className="list-disc list-inside mt-1">
                            <li>Initial Temperature: Controls initial exploration (default: 1000)</li>
                            <li>Cooling Rate: Affects convergence speed (default: 0.99)</li>
                            <li>Max Iterations: Maximum optimization steps (default: 1000)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Cpu className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Quantum-Inspired Algorithm</h3>
                        <p className="text-muted-foreground">
                          A hybrid quantum-classical algorithm that combines quantum circuit simulation with reinforcement learning.
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Key Parameters:</strong>
                          <ul className="list-disc list-inside mt-1">
                            <li>Number of Layers: Quantum circuit depth (default: 2)</li>
                            <li>Max Iterations: Optimization cycles (default: 100)</li>
                            <li>Number of Samples: Bitstrings to evaluate (default: 5)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Code2 className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Tabu Search</h3>
                        <p className="text-muted-foreground">
                          A metaheuristic search method that maintains a memory of recent solutions to avoid revisiting them.
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Key Parameters:</strong>
                          <ul className="list-disc list-inside mt-1">
                            <li>Tabu Tenure: Memory length (default: 10)</li>
                            <li>Max Iterations: Search iterations (default: 1000)</li>
                            <li>Neighborhood Size: Solutions to evaluate (default: 10)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-yellow-500/10">
                        <Database className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Genetic Algorithm</h3>
                        <p className="text-muted-foreground">
                          An evolutionary algorithm that mimics natural selection to evolve better solutions over generations.
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Key Parameters:</strong>
                          <ul className="list-disc list-inside mt-1">
                            <li>Population Size: Number of solutions (default: 50)</li>
                            <li>Mutation Rate: Variation probability (default: 0.01)</li>
                            <li>Number of Generations: Evolution cycles (default: 100)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="datasets" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Working with Datasets</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Supported Formats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <FileJson className="h-6 w-6 text-yellow-500" />
                        <div>
                          <h4 className="font-medium">JSON Format</h4>
                          <p className="text-sm text-muted-foreground">
                            {`{
  "qubo_matrix": [[1, -1], [-1, 1]],
  "constant": 0.0
}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Database className="h-6 w-6 text-blue-500" />
                        <div>
                          <h4 className="font-medium">CSV Format</h4>
                          <p className="text-sm text-muted-foreground">
                            Matrix representation with optional header row and constant term
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Example Problems</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium">Max-Cut Problem</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          A graph partitioning problem where we aim to maximize the number of edges between two sets of vertices.
                        </p>
                        <pre className="mt-2 text-sm bg-background p-2 rounded">
                          {`# 4-vertex graph
[[ 0, 1,-1,-1],
 [ 1, 0,-1,-1],
 [-1,-1, 0, 1],
 [-1,-1, 1, 0]]`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="hardware" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">AWS Hardware Options</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Server className="h-6 w-6 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">CPU Instances</h3>
                          <p className="text-sm text-muted-foreground">
                            General purpose computing for most optimization tasks
                          </p>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span>t3.medium</span>
                              <span className="text-green-500">$0.0416/hour</span>
                            </li>
                            <li className="flex justify-between">
                              <span>c6i.large</span>
                              <span className="text-green-500">$0.085/hour</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Cpu className="h-6 w-6 text-purple-500" />
                        <div>
                          <h3 className="font-semibold">GPU Instances</h3>
                          <p className="text-sm text-muted-foreground">
                            Accelerated computing for large-scale problems
                          </p>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span>g4dn.xlarge</span>
                              <span className="text-green-500">$0.526/hour</span>
                            </li>
                            <li className="flex justify-between">
                              <span>p3.2xlarge</span>
                              <span className="text-green-500">$3.06/hour</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Choosing the Right Instance</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Use CPU instances for problems with up to 1000 variables</li>
                      <li>Choose GPU instances for larger problems or when using quantum-inspired algorithms</li>
                      <li>Consider memory requirements based on your problem size</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Technical Documentation</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">API Integration</h3>
                    <pre className="bg-muted p-4 rounded-lg text-sm">
{`# Python example using requests
import requests

api_endpoint = "https://api.ceptum.ai/solve"
data = {
    "qubo_matrix": [[1, -1], [-1, 1]],
    "solver": "simulated-annealing",
    "parameters": {
        "initial_temperature": 1000,
        "cooling_rate": 0.99
    }
}

response = requests.post(api_endpoint, json=data)
result = response.json()`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Performance Considerations</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Matrix size impacts memory usage: O(n²) for n variables</li>
                      <li>• GPU acceleration available for matrices larger than 1000x1000</li>
                      <li>• Batch processing recommended for multiple problem instances</li>
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Full API Documentation
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      Code Examples
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documentation;