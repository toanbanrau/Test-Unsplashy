"use client";
import React, { useState, useMemo } from "react";
import ChildMemo from "./ChildMemo";

export default function MemoExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const data = useMemo(() => {
    return { count };
  }, [count]);

  return (
    <div>
      <h1>Demo useMemo</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập gì đó"
      />
      <button onClick={() => setCount((c) => c + 1)}>Tăng</button>

      <ChildMemo data={data} />
    </div>
  );
}
