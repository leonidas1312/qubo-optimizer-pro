import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

interface ResultsChartProps {
  data: number[];
}

export const ResultsChart = ({ data }: ResultsChartProps) => {
  const chartData = data.map((cost, index) => ({
    iteration: index + 1,
    energy: cost
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Optimization Progress</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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