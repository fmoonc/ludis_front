import React from "react";
import { Lucide } from "@/base-components";
import { helper } from "../../utils/helper";
import { Link } from "react-router-dom";

export default function LinkPage({ path = "/", icon = "Home", setSearch }) {
  return (
    <Link
      to={path}
      className="flex items-center p-1 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-3xl z-10"
      onClick={() => setSearch("")}
    >
      <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
        <Lucide icon={icon} className="w-4 h-4" />
      </div>
      <div className="ml-3">
        {path === "/" ? "Dashboard" : helper.capitalizeFirstLetter(path)}
      </div>
    </Link>
  );
}
