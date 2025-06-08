// src/layout/Sidebar.jsx
import React from "react";

export default function Sidebar({ width, side, onResize, children }) {
  const borderClass = side === "left" ? "border-r" : "border-l";
  const resizerClass = side === "left" ? "right-0" : "left-0";

  return (
    <div
      className={`relative hidden lg:flex flex-col bg-gray-50 dark:bg-gray-800 ${borderClass} bg-orange-100`}
      style={{ width, overflow: "auto" }}
    >
      {children}

      <div
        className={`absolute top-0 ${resizerClass} h-full w-1 cursor-col-resize`}
        onMouseDown={onResize}
      />
    </div>
  );
}
