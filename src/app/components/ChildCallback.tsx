import React from "react";

interface ChildProps {
  onClick: () => void;
}

const ChildCallback = ({ onClick }: ChildProps) => {
  console.log(" ChildCallback rendered");
  return <button onClick={onClick}>Click</button>;
};

export default React.memo(ChildCallback);
