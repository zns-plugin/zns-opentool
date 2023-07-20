import { Button, Form, Input, Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import AuthContext from "src/hooks/useAuth";
import "./style.less";
import { useContext } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { API_STATUS, ROUTE } from "src/constants";
import { useGetTemplate } from "src/applications/template.usecase";

export const ProtectedLayout = () => {
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoTo = () => {
    navigate(ROUTE.LIST_TEMPLATE);
  };
  const { getListTemplate } = useGetTemplate();
  const handleSubmitLogin = () => {
    form.validateFields().then(() => {
      let data = form.getFieldsValue();
      getListTemplate({ offset: 0, limit: 10 }, data.accessToken).then(
        (res) => {
          if (res.error === API_STATUS.SUCCESS) {
            login(data.accessToken, handleGoTo);
          } else {
            message.error(res.message);
          }
        }
      );
    });
  };
  return (
    <Layout className="protected-layout">
      <Content className="protected-layout-content">
        <Form form={form} layout="horizontal" className="protected-form">
          <Form.Item label="OA Access token" name={"accessToken"}>
            <Input placeholder="Nhập OA Access token" />
          </Form.Item>
          <Form.Item>
            <i>
              Hướng dẫn lấy OA Access Token&nbsp;
              <a
                href="https://developers.zalo.me/docs/api/official-account-api/xac-thuc-va-uy-quyen/cach-2-xac-thuc-voi-cong-cu-api-explorer/phuong-thuc-lay-oa-access-token-su-dung-cong-cu-api-explorer-post-5004"
                target="_blank"
              >
                <b>tại đây</b>
              </a>
            </i>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={() => handleSubmitLogin()}
              icon={<SendOutlined />}
            >
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
