import React from "react";
import ParagraphContent from "./ParagraphContent";
import ListContent from "./ListContent";

export default function SectionContent({ content }) {
  return (
    <div>
      {content.map((c) =>
        c.contentType === "paragraph" ? (
          <ParagraphContent content={c} />
        ) : (
          <ListContent content={c} />
        )
      )}
    </div>
  );
}
