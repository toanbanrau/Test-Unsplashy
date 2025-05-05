import React from "react";

type Props = {
  data: { count: number };
};

const ChildMemo = ({ data }: Props) => {
  console.log("Child rendered");
  return <p>Giá trị count: {data.count}</p>;
};

export default React.memo(ChildMemo);
