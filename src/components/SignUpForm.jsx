import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FormSubmitButton from "./FormSubmitButton";

export default function SignUpForm({
  submitForm,
  formData,
  handleChange,
  loading,
}) {
  return (
    <form className="space-y-4 text-base" onSubmit={submitForm}>
      <div className="space-y-2 flex flex-col w-full">
        <label className="font-medium">Full Name</label>
        <input
          className="boxShadow p-1 rounded-md  focus:ring-2 focus:ring-[#238C69] outline-none appearance-none"
          name="fullName"
          type="text"
          onChange={handleChange}
          value={formData.fullName}
        />
      </div>
      <div className="space-y-2 flex flex-col w-full">
        <label className="font-medium">Email</label>
        <input
          className="boxShadow p-1 rounded-md  focus:ring-2 focus:ring-[#238C69] outline-none appearance-none"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className="space-y-2 flex flex-col w-full">
        <label className="font-medium">Password</label>
        <input
          className="boxShadow p-1 rounded-md  focus:ring-2 focus:ring-[#238C69] outline-none appearance-none"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <FormSubmitButton
        customStyle={"h-10 mt-2"}
        label={"Submit"}
        submitLoading={loading}
      />
    </form>
  );
}
