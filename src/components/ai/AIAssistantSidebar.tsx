import { AIAssistantSidebarProps } from "./types";

export const AIAssistantSidebar = () => {
  return (
    <div className="w-64 bg-neutral-900/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/75 border-r border-white/10 p-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Specify a GitHub repository and file path to analyze and modify code. Example format:
        </p>
        <code className="block text-sm bg-muted/50 p-2 rounded">
          owner/repo/path/to/file.py
        </code>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Features:</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Code analysis</li>
            <li>• Dependency mapping</li>
            <li>• Integration planning</li>
            <li>• Code modifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
};