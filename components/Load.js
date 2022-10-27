import { Loading } from "@nextui-org/react";
import React from "react";

function Load() {
  return (
    <div style={{ position: "relative", height: "90vh", width: "100%" }}>
      <div style={{ position: "absolute", left: "50%", top: "50%" }}>
        <Loading size="lg" />
      </div>
    </div>
  );
}

export default Load;
