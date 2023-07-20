import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.less";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5D5FEF",
          colorTextBase: "#000",
          colorError: "#F64E60",
          colorSuccess: "#DCFCE7",
          colorWarning: "#FFA800",
          colorBgLayout: "#FAFBFC",
          colorLink: "#5D5FEF",
          colorLinkHover: "#5D5FEF",
          colorBorderSecondary: "#ececec",
          boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
          boxShadowSecondary: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
