import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

interface OptimizationDataPoint {
  iteration: number;
  energy: number;
}

interface ResultsChartProps {
  data: OptimizationDataPoint[];
}

export const ResultsChart = ({ data }: ResultsChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Optimization Progress</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="iteration" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#0FA0CE"
              strokeWidth={2}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};