import { Card } from "@/components/ui/card";
import { FileJson, Database } from "lucide-react";

export const DatasetsTab = () => {
  return (
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
  );
};
