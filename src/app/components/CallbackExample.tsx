"use client";
import React, { useState, useCallback } from "react";
import ChildCallback from "./ChildCallback";

export default function CallBackExample() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => setCount((prev) => prev + 1), []);
  return (
    <div>
      <h1>DemoCallBack</h1>
      <h1>{count}</h1>
      <ChildCallback onClick={handleClick} />
    </div>
  );
}
