import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code2, ExternalLink } from "lucide-react";

export const TechnicalTab = () => {
  return (
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
  );
};