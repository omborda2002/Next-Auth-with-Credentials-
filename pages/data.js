import { Text } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import Load from "../components/Load";

function Data() {
  return (
    <div>
      <Text h2>Data 🚦</Text>
    </div>
  );
}

export default Data;

// Path: /data (pages/data.js)
/**
 * @description here Data.auth page is authenticated and will redirect to login page if not authenticated (check in _app.js)
 */
Data.auth = true;
