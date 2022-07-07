interface MarkdownProps {
  markdown: string;
}

const Markdown = ({ markdown }: MarkdownProps) => (
  <div
    className="markdown-body"
    style={{
      maxWidth: "1012px",
      marginRight: "auto",
      marginLeft: "auto",
    }}
    dangerouslySetInnerHTML={{ __html: markdown }}
  />
);

export default Markdown;
