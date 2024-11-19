import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const ResultsChart = () => {
  const [data, setData] = useState([
    { iteration: 1, energy: -10 },
    { iteration: 2, energy: -15 },
    { iteration: 3, energy: -25 },
    { iteration: 4, energy: -28 },
    { iteration: 5, energy: -32 },
  ]);

  // Simulate data updates every 2 seconds for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const lastIteration = currentData[currentData.length - 1].iteration;
        return [
          ...currentData,
          {
            iteration: lastIteration + 1,
            energy: currentData[currentData.length - 1].energy - Math.random() * 5
          }
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Optimization Progress</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="iteration" 
              label={{ value: 'Iteration', position: 'bottom' }}
              className="text-muted-foreground"
            />
            <YAxis 
              label={{ value: 'Energy', angle: -90, position: 'left' }}
              className="text-muted-foreground"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};