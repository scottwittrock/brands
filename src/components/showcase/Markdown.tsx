import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders brand markdown into the themed `.sc-doc` document styles. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="sc-doc">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
