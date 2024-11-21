import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';

interface CodeUploadSectionProps {
  code: string;
  onCodeChange: (value: string) => void;
}

export const CodeUploadSection = ({ code, onCodeChange }: CodeUploadSectionProps) => {
  const editorTheme = EditorView.theme({
    '&': {
      color: '#000000',
      backgroundColor: '#ffffff'
    },
    '.cm-content': {
      fontFamily: 'monospace',
      fontSize: '14px'
    },
    '.cm-scroller': {
      overflow: 'hidden'
    }
  });

  const lineHeight = 24;
  const minHeight = lineHeight * 10;
  const editorStyle = {
    minHeight: `${minHeight}px`,
    height: 'auto',
    maxHeight: 'none'
  };

  return (
    <div className="mb-8">
      <label className="block text-lg font-medium mb-2">
        Algorithm Code (Python)
      </label>
      <div className="border rounded-lg overflow-hidden">
        <CodeMirror
          value={code}
          extensions={[python(), editorTheme]}
          onChange={onCodeChange}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            autocompletion: true,
          }}
          style={editorStyle}
        />
      </div>
    </div>
  );
};