import { Button, Descriptions, Result, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTemplate } from "src/applications/template.usecase";
import { API_STATUS, ROUTE } from "src/constants";
import AuthContext from "src/hooks/useAuth";
import { configDescriptionTemplate } from "./props";

const DetailTemplate = () => {
  const { getDetailTemplate } = useGetTemplate();
  const { accessToken } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [dataTemplate, setDataTemplate] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let id = searchParams.get("id");
    if (id) {
      getDetailTemplate(id, accessToken).then((res) => {
        if (res.error === API_STATUS.SUCCESS && res.data) {
          setDataTemplate(res.data);
        }
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spin></Spin>
      ) : dataTemplate ? (
        <Descriptions column={1} bordered>
          {dataTemplate &&
            configDescriptionTemplate.map((item) => {
              const renderItem = (item) => {
                const dataRender = dataTemplate[item.dataIndex];
                if (dataRender === undefined || dataRender === null)
                  return "---";
                if (item.render) {
                  if (item.render(dataRender)) {
                    return item.render(dataRender);
                  }
                } else {
                  if (typeof dataRender === "object") {
                    return JSON.stringify(dataRender);
                  } else {
                    return dataRender;
                  }
                }
              };
              return (
                <Descriptions.Item
                  label={item.title}
                  span={item.colSpan}
                  key={item.key}
                >
                  {renderItem(item)}
                </Descriptions.Item>
              );
            })}
        </Descriptions>
      ) : (
        <Result
          status="error"
          title=""
          subTitle="Đã có lỗi xảy ra hoặc không có dữ liệu."
          extra={
            <Button
              type="primary"
              onClick={() => navigate(ROUTE.LIST_TEMPLATE)}
            >
              Trở về trang trước
            </Button>
          }
        />
      )}
    </>
  );
};

export default DetailTemplate;
