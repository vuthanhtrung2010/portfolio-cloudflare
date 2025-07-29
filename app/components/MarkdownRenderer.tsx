import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "prose dark:prose-invert",
}: MarkdownRendererProps) {
  // Pre-process content to handle math expressions more reliably
  const processedContent = useMemo(() => {
    let processed = content;
    
    // First, temporarily replace block math with placeholders to avoid conflicts
    // Using non-greedy matching for better performance
    const blockMathMatches: string[] = [];
    processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
      const index = blockMathMatches.length;
      blockMathMatches.push(math.trim()); // Trim whitespace for cleaner output
      return `__BLOCK_MATH_${index}__`;
    });
    
    // Then handle inline math $...$ with more specific pattern
    // Avoid matching across line breaks and be more restrictive
    processed = processed.replace(/\$([^\s$][^$\n]*[^\s$]|\S)\$/g, '<span class="math-inline">$1</span>');
    
    // Finally, restore block math with proper HTML
    blockMathMatches.forEach((math, index) => {
      processed = processed.replace(`__BLOCK_MATH_${index}__`, `<div class="math-display">${math}</div>`);
    });
    
    return processed;
  }, [content]);

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Handle inline math
          span: ({ node, className, children, ...props }) => {
            if (className === "math-inline") {
              return <InlineMath math={String(children)} />;
            }
            return (
              <span className={className} {...props}>
                {children}
              </span>
            );
          },
          // Handle block math
          div: ({ node, className, children, ...props }) => {
            if (className === "math-display") {
              return (
                <div className="text-center my-4">
                  <BlockMath math={String(children)} />
                </div>
              );
            }
            return (
              <div className={className} {...props}>
                {children}
              </div>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
