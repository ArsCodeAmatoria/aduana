import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  value: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  value,
  showLineNumbers = false,
}) => {
  return (
    <div className="my-4 rounded-md overflow-hidden border border-slate-200 bg-slate-900">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          borderRadius: 0,
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}; 