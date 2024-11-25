import { File, Folder } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
    <div className="w-full h-72 rounded-md border">
      <div className="p-3 border-b bg-muted/50">
        <h3 className="text-sm font-medium">Repository Files</h3>
      </div>
      <ScrollArea className="h-[calc(100%-3rem)]">
        <div className="p-2">
          {files.map((file, index) => (
            <div key={file.path}>
              {renderNode(file)}
              {index < files.length - 1 && <Separator className="my-1" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};