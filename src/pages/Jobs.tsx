import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchJobs();

    // Set up real-time subscription
    const subscription = supabase
      .channel('jobs_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: `creator_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchJobs();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          solver:solver_id(name),
          dataset:dataset_id(name),
          hardware:hardware_id(name)
        `)
        .eq('creator_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error("Failed to fetch jobs");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'failed':
        return 'bg-red-500/10 text-red-500';
      case 'running':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-yellow-500/10 text-yellow-500';
    }
  };

  const activeJobs = jobs.filter(job => job.status === 'running').length;
  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const resultsAvailable = jobs.filter(job => job.result !== null).length;

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Job Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your optimization tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Active Jobs</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{activeJobs}</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Completed</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{completedJobs}</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">Results Available</h3>
            </div>
            <p className="text-3xl font-bold mt-2">{resultsAvailable}</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No jobs have been submitted yet. Start by creating a new optimization task!
              </p>
            ) : (
              jobs.map((job) => (
                <Card key={job.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{job.name}</h3>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium">Solver</p>
                      <p>{job.solver?.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Dataset</p>
                      <p>{job.dataset?.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Hardware</p>
                      <p>{job.hardware?.name}</p>
                    </div>
                  </div>
                  {job.error && (
                    <p className="text-sm text-red-500">{job.error}</p>
                  )}
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Jobs;