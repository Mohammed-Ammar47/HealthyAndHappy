import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function FormSubmitButton({
  submitLoading,
  label,
  customStyle,
}) {
  return (
    <button
      className={`${customStyle} flex flex-row items-center justify-center space-x-2 font-Libre-Franklin text-base  bg-[#238C69] font-medium text-white rounded-md  px-2.5   hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2`}
      type="submit"
    >
      <p>{label}</p>
      {submitLoading && (
        <ClipLoader color="white" loading size={16} speedMultiplier={1} />
      )}{" "}
    </button>
  );
}
