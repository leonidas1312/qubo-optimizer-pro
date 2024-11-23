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
    const paddingLeft = `${level * 1.2}rem`; // Smaller indent for nested items

    if (node.type === "file") {
      return (
        <div
          key={node.path}
          className={`flex items-center py-1 px-2 cursor-pointer ${
            isSelected ? "bg-gray-700 text-white" : "hover:bg-gray-700 text-gray-200"
          }`}
          style={{ paddingLeft }}
          onClick={() => handleFileSelect(node.path)}
        >
          <File
            className={`h-4 w-4 mr-2 ${
              isSelected ? "text-white" : "text-gray-400"
            }`}
          />
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
        <CollapsibleTrigger className="flex items-center w-full py-1 px-2 hover:bg-gray-700">
          <div style={{ paddingLeft }} className="flex items-center">
            {isExpanded ? (
              <ChevronDown
                className={`h-4 w-4 mr-2 ${
                  isSelected ? "text-white" : "text-gray-400"
                }`}
              />
            ) : (
              <ChevronRight
                className={`h-4 w-4 mr-2 ${
                  isSelected ? "text-white" : "text-gray-400"
                }`}
              />
            )}
            <Folder
              className={`h-4 w-4 mr-2 ${
                isSelected ? "text-white" : "text-gray-400"
              }`}
            />
            <span
              className={`text-sm ${
                isSelected ? "text-white" : "text-gray-200"
              }`}
            >
              {node.name}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-2">
          {node.children?.map((child) => renderNode(child, level + 1))}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="w-full max-h-64 overflow-y-auto bg-black border border-gray-700 rounded-lg">
      {files.map((file) => renderNode(file))}
    </div>
  );
};
