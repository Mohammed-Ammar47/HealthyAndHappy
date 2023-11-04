import DOMPurify from "dompurify";
import React from "react";

export default function ParagraphContent({ content }) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content.content),
      }}
      className="text-lg text-[#104030] font-Roboto font-normal p-1"
    ></p>
  );
}
