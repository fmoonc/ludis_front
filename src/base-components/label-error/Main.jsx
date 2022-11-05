import React from "react";

export default function LabelError({ errors = {} }) {
  return (
    <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
      <div className="mr-auto">
        <label className="text-danger mt-2">{errors.message}</label>
      </div>
    </div>
  );
}
