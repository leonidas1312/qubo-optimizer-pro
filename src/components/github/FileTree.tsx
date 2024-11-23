import { File, Folder } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FileNode {
  name: string;
  path: string;
  type: "file" | "tree";
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  onFileSelect?: (path: string) => void;
}

export const FileTree = ({ files, onFileSelect }: FileTreeProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const handleFileSelect = (path: string) => {
    setSelectedFilePath(path);
    onFileSelect?.(path);
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.path);
    const isSelected = selectedFilePath === node.path;
    const paddingLeft = `${level * 1.5}rem`;

    if (node.type === "file") {
      return (
        <div
          key={node.path}
          className={`flex items-center py-1.5 px-3 cursor-pointer text-sm transition-colors ${
            isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted"
          }`}
          style={{ paddingLeft }}
          onClick={() => handleFileSelect(node.path)}
        >
          <File className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{node.name}</span>
        </div>
      );
    }

    return (
      <Collapsible
        key={node.path}
        open={isExpanded}
        onOpenChange={() => toggleNode(node.path)}
      >
        <CollapsibleTrigger className="flex items-center w-full py-1.5 px-3 hover:bg-muted transition-colors">
          <div style={{ paddingLeft }} className="flex items-center text-sm">
            <Folder className="h-4 w-4 mr-2 text-blue-400" />
            <span>{node.name}</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {node.children?.map((child) => renderNode(child, level + 1))}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="w-full overflow-y-auto bg-background border border-border rounded-lg h-[50vh]">
      <div className="p-3 border-b border-border bg-muted/50">
        <h3 className="text-sm font-medium">Repository Files</h3>
      </div>
      <div className="h-[calc(50vh-3rem)] overflow-y-auto">
        {files.map((file) => renderNode(file))}
      </div>
    </div>
  );
};