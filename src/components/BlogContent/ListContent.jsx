import DOMPurify from "dompurify";
import React from "react";

export default function ListContent({ content }) {
  return (
    <>
      {content.content.map((c) => (
        <div className="flex flex-row flex-wrap text-base sm:text-lg font-Roboto p-1">
          <p className="text-[#104030] font-semibold list-outside list-disc list-item">
            {c.contentTitle}:{" "}
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(c.paragraph),
            }}
            className="text-[#104030]  font-normal "
          ></p>
        </div>
      ))}
    </>
  );
}
