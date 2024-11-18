import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Examples = () => {
  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text animate-fade-in">Optimization Problem Examples</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vehicle Routing Problem with Time Windows */}
          <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Vehicle Routing Problem with Time Windows</CardTitle>
              <CardDescription className="text-muted-foreground">Optimizing delivery routes with time constraints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                The VRPTW extends the classic VRP by adding time windows during which each customer <InlineMath>{"i"}</InlineMath> has a time window <InlineMath>{"[a_i, b_i]"}</InlineMath> and service time <InlineMath>{"s_i"}</InlineMath>.
              </p>
              
              <div className="bg-card/50 p-6 rounded-lg border border-border/50">
                <h4 className="font-semibold mb-4">Mathematical Formulation:</h4>
                <BlockMath>{"\\min \\sum_{k \\in K} \\sum_{(i,j) \\in A} c_{ij} x_{ij}^k"}</BlockMath>
                <p className="text-sm text-muted-foreground mt-4">Where <InlineMath>{"x_{ij}^k"}</InlineMath> is 1 if vehicle k travels from i to j, and 0 otherwise.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Example Scenario:</h4>
                <p className="text-sm">Consider a delivery company with 3 vehicles and 5 customers:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Customer 1: Time window [8:00, 10:00], Service time: 15min</li>
                  <li>Customer 2: Time window [9:00, 11:00], Service time: 20min</li>
                  <li>Customer 3: Time window [10:00, 12:00], Service time: 15min</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tail Assignment Problem */}
          <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in [animation-delay:200ms]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Tail Assignment Problem</CardTitle>
              <CardDescription className="text-muted-foreground">Assigning aircraft to flight sequences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                The Tail Assignment Problem involves assigning specific aircraft (tails) to planned flights while considering maintenance requirements and operational constraints.
              </p>
              
              <div className="bg-card/50 p-6 rounded-lg border border-border/50">
                <h4 className="font-semibold mb-4">Mathematical Formulation:</h4>
                <BlockMath>{"\\min \\sum_{t \\in T} \\sum_{p \\in P} c_{tp} x_{tp}"}</BlockMath>
                <p className="text-sm text-muted-foreground mt-4">Where <InlineMath>{"x_{tp}"}</InlineMath> is 1 if tail t is assigned to path p, and 0 otherwise.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Example Scenario:</h4>
                <p className="text-sm">An airline with 3 aircraft needs to cover 6 flights:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Aircraft 1: Due for maintenance after 20 flight hours</li>
                  <li>Aircraft 2: Fresh from maintenance</li>
                  <li>Aircraft 3: 15 flight hours remaining</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Gate Assignment Problem */}
          <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in [animation-delay:400ms]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Gate Assignment Problem</CardTitle>
              <CardDescription className="text-muted-foreground">Optimizing airport gate allocation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                The Gate Assignment Problem involves assigning arriving flights to gates while minimizing passenger walking distances and maximizing gate utilization.
              </p>
              
              <div className="bg-card/50 p-6 rounded-lg border border-border/50">
                <h4 className="font-semibold mb-4">Mathematical Formulation:</h4>
                <BlockMath>{"\\min \\sum_{f \\in F} \\sum_{g \\in G} w_{fg} x_{fg}"}</BlockMath>
                <p className="text-sm text-muted-foreground mt-4">Where <InlineMath>{"x_{fg}"}</InlineMath> is 1 if flight f is assigned to gate g, and 0 otherwise.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Example Scenario:</h4>
                <p className="text-sm">An airport terminal with 4 gates handling 8 flights:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Gates 1-2: Can handle wide-body aircraft</li>
                  <li>Gates 3-4: For narrow-body aircraft only</li>
                  <li>Minimum connection time: 30 minutes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Job Shop Scheduling */}
          <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in [animation-delay:600ms]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Job Shop Scheduling Problem</CardTitle>
              <CardDescription className="text-muted-foreground">Optimizing manufacturing operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                The Job Shop Scheduling Problem involves scheduling n jobs on m machines, where each job consists of a sequence of operations with specific processing times.
              </p>
              
              <div className="bg-card/50 p-6 rounded-lg border border-border/50">
                <h4 className="font-semibold mb-4">Mathematical Formulation:</h4>
                <BlockMath>{"\\min C_{max} = \\max_{j \\in J} C_j"}</BlockMath>
                <p className="text-sm text-muted-foreground mt-4">Where <InlineMath>{"C_j"}</InlineMath> is the completion time of job j.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Example Scenario:</h4>
                <p className="text-sm">A manufacturing facility with 3 machines processing 4 jobs:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Job 1: Machine sequence (1,2,3), Processing times (3,2,4)</li>
                  <li>Job 2: Machine sequence (2,1,3), Processing times (2,3,3)</li>
                  <li>Job 3: Machine sequence (3,2,1), Processing times (4,2,1)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Examples;