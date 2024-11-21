interface ExecutionStatusProps {
  status: string;
  result: any;
}

export const ExecutionStatus = ({ status, result }: ExecutionStatusProps) => {
  if (!status) return null;

  return (
    <>
      <div className="mt-6">
        <p className="text-lg font-medium">
          Status: {status}
        </p>
      </div>

      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Execution Result</h2>
          <p className="mb-2">
            <strong>Execution Time:</strong> {result.executionTime} seconds
          </p>
          <p className="mb-4">
            <strong>Best Cost Function Value:</strong> {result.bestCost}
          </p>
        </div>
      )}
    </>
  );
};