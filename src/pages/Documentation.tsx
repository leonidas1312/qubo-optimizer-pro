import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/documentation/OverviewTab";
import { SolversTab } from "@/components/documentation/SolversTab";
import { DatasetsTab } from "@/components/documentation/DatasetsTab";
import { HardwareTab } from "@/components/documentation/HardwareTab";
import { TechnicalTab } from "@/components/documentation/TechnicalTab";

const Documentation = () => {
  return (
    <div className="w-full">
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

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="solvers">
            <SolversTab />
          </TabsContent>

          <TabsContent value="datasets">
            <DatasetsTab />
          </TabsContent>

          <TabsContent value="hardware">
            <HardwareTab />
          </TabsContent>

          <TabsContent value="technical">
            <TechnicalTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;