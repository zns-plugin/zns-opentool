import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "antd/dist/reset.css";
import { AuthProvider } from "./hooks/useAuth";
import LoadingBar from "./share/componens/LoadingBar";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<LoadingBar />} />
    </AuthProvider>
  );
};

export default App;
