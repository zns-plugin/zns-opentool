import { Empty } from "antd";
import React from "react";

const EmptyCustom = ({ des = "Không có dữ liệu" }) => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Empty description={des} />
    </div>
  );
};

export default EmptyCustom;
