import React, { useEffect } from "react";
// 注意：未知原因，这个css无法生效，需要在index.html中引入prism.css
// import "prismjs/components/prism-css";
import Prism from "prismjs";

// 确保引入你需要的语言支持
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-python";
// // import "prismjs/components/prism-html";

interface RichTextProps {
  content: string;
}
const RichText: React.FC<RichTextProps> = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  const renderContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const codeBlocks = doc.querySelectorAll("code");

    codeBlocks.forEach((block) => {
      const language = block.className.replace("language-", "");
      const code = block.textContent || "";
      const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
      block.innerHTML = highlightedCode;
    });

    return { __html: doc.body.innerHTML };
  };

  return <div dangerouslySetInnerHTML={renderContent()} />;
};

export default RichText;
