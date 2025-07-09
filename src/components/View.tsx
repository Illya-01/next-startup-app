import React from "react";
import Ping from "./Ping";
import ViewCounter from "./ViewCounter";

const View = ({ id }: { id: string }) => {
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <ViewCounter id={id} />
    </div>
  );
};

export default View;
