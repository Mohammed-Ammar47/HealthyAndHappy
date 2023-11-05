import React, { useState } from "react";
import FormSubmitButton from "../FormSubmitButton";

export default function CommentForm({
  onSubmit,
  onDiscard,
  currentMessage,
  currentMessageId,
  form,
}) {
  const [message, setMessage] = useState("" || currentMessage);
  const [submitLoading, setSubmitLoading] = useState(false);

  function handleChange(e) {
    setMessage(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    onSubmit(message, currentMessageId).then(() => {
      setSubmitLoading(false);
      setMessage("");
      form !== "review" && onDiscard(false);
    });
  }
  return (
    <form className="w-full my-2 " onSubmit={handleSubmit}>
      <textarea
        name="message"
        value={message}
        onChange={handleChange}
        className="w-full p-3 ring-2 ring-gray-500 ring-opacity-50 rounded-md focus:ring-[#238C69] focus:boxShadow  outline-none"
        rows={3}
      ></textarea>
      <div className="flex flex-row justify-end  ">
        <div className={` w-fit flex flex-row space-x-2 `}>
          {form !== "review" && (
            <p
              onClick={() => {
                onDiscard(false);
              }}
              className="flex w-28 flex-row items-center justify-center space-x-2 font-Libre-Franklin text-base  bg-[#238C69] font-medium text-white rounded-md  px-2.5   hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
            >
              Discard
            </p>
          )}
          <div>
            <FormSubmitButton
              customStyle={`h-8 w-28`}
              label={"Submit"}
              submitLoading={submitLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
