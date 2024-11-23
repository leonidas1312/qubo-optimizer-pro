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
          className={`flex items-center py-1.5 px-3 cursor-pointer text-sm ${
            isSelected ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
          }`}
          style={{ paddingLeft }}
          onClick={() => handleFileSelect(node.path)}
        >
          <File className="h-4 w-4 mr-2 text-gray-500" />
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
        <CollapsibleTrigger className="flex items-center w-full py-1.5 px-3 hover:bg-gray-100">
          <div style={{ paddingLeft }} className="flex items-center text-sm">
            <Folder className="h-4 w-4 mr-2 text-blue-500" />
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
    <div className="w-full overflow-y-auto bg-white border border-gray-200 rounded-lg">
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700">Repository Files</h3>
      </div>
      <div className="max-h-[calc(100vh-20rem)]">
        {files.map((file) => renderNode(file))}
      </div>
    </div>
  );
};