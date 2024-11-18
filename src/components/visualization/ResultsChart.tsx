import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

const data = [
  { iteration: 1, energy: -10 },
  { iteration: 2, energy: -15 },
  { iteration: 3, energy: -25 },
  { iteration: 4, energy: -28 },
  { iteration: 5, energy: -32 },
];

export const ResultsChart = () => {
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
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};