import React, { useState } from "react";
import FontLoader from "./src/utils/FontLoader";
import Navigators from "./src/navigators";
import {AuthProvider} from "./src/contexts/AuthContext";

export default function App() {
  return (
    <FontLoader>
      <AuthProvider>
        <Navigators />
      </AuthProvider>
    </FontLoader>
  );
}


