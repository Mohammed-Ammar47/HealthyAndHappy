import React from "react";

export default function SignUpForm({ submitForm, formData, handleChange }) {
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
      <button
        className="font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md w-full px-2.5  mt-4 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
