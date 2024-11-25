import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateQUBOtForm } from "@/components/qubots/CreateQUBOtForm";
import { QUBOtsList } from "@/components/qubots/QUBOtsList";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUBOts = () => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-8 px-4">
          <Card className="p-8 text-center space-y-4">
            <Github className="w-12 h-12 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-bold">GitHub Authentication Required</h1>
            <p className="text-muted-foreground">
              Please login with GitHub to create and manage your QUBOt solvers.
            </p>
            <Button 
              onClick={login}
              className="bg-gradient-to-r from-blue-600 to-blue-800"
            >
              Login with GitHub
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div>
          <h1 className="text-4xl font-bold gradient-text">QUBOt Hub</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your QUBOts - combinations of solvers, datasets, and hardware
          </p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create QUBOt</TabsTrigger>
            <TabsTrigger value="browse">Browse QUBOts</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <CreateQUBOtForm />
          </TabsContent>

          <TabsContent value="browse">
            <QUBOtsList />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default QUBOts;