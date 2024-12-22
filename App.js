import React, { useEffect } from "react";
import FontLoader from "./src/utils/FontLoader";
import Navigators from "./src/navigators";
import {AuthProvider} from "./src/contexts/AuthContext";
import { LogBox } from 'react-native';

export default function App() {

  useEffect(() => {
    // Tắt tất cả các cảnh báo
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <FontLoader>
      <AuthProvider>
        <Navigators />
      </AuthProvider>
    </FontLoader>
  );
}


