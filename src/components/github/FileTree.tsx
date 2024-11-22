import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
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

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.path);
    const paddingLeft = `${level * 1.5}rem`;

    if (node.type === "file") {
      return (
        <div
          key={node.path}
          className="flex items-center py-1 px-2 hover:bg-accent cursor-pointer"
          style={{ paddingLeft }}
          onClick={() => onFileSelect?.(node.path)}
        >
          <File className="h-4 w-4 mr-2" />
          <span className="text-sm">{node.name}</span>
        </div>
      );
    }

    return (
      <Collapsible
        key={node.path}
        open={isExpanded}
        onOpenChange={() => toggleNode(node.path)}
      >
        <CollapsibleTrigger className="flex items-center w-full py-1 px-2 hover:bg-accent">
          <div style={{ paddingLeft }} className="flex items-center">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            <Folder className="h-4 w-4 mr-2" />
            <span className="text-sm">{node.name}</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {node.children?.map((child) => renderNode(child, level + 1))}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {files.map((file) => renderNode(file))}
    </div>
  );
};