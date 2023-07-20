import { Card, Form, Input, InputNumber, message, Modal } from "antd";
import React, { useContext } from "react";
import { useSendMessage } from "src/applications/message.usecase";
import { API_STATUS } from "src/constants";
import AuthContext from "src/hooks/useAuth";

const PopupSendZNS = ({ visible, dataTemplate, handleClose }) => {
  const { sendZNS } = useSendMessage();
  const { accessToken } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    try {
      const storePromise = form.validateFields();

      storePromise
        .then((i) => {
          let data = {
            ...form.getFieldsValue(),
            templateId: dataTemplate.templateId,
          };
          sendZNS(data, accessToken).then((resp) => {
            console.log("resp", resp);
            if (resp.error === API_STATUS.SUCCESS) {
              message.success("Gửi tin nhắn thành công!");
              form.resetFields();
              handleClose();
            } else {
              message.error(resp.message);
            }
          });
        })
        .catch((errorInfo) => {
          console.log("error", errorInfo);
        });
    } catch (e) {}
  };
  return (
    <Modal
      title="Gửi tin nhắn"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        handleClose();
        form.resetFields();
      }}
      okText="Gửi tin nhắn"
      cancelText="Huỷ"
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
      >
        <Form.Item label="Template Id" name={"templateId"} hidden={true}>
          <InputNumber disabled />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name={"phone"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại nhận tin!",
            },
          ]}
          help={
            <p>
              SĐT phải được liên kết với tài khoản Zalo và ở dạng chuẩn hóa theo
              mã quốc gia. <br />
              VD của Việt Nam là 84xxxx
            </p>
          }
        >
          <Input />
        </Form.Item>
        <Card title={"Tham số"}>
          {dataTemplate &&
            dataTemplate.listParams &&
            dataTemplate.listParams.map((ele) => {
              return (
                <Form.Item
                  label={ele.name}
                  name={["templateData", ele.name]}
                  rules={[
                    {
                      required: ele.require,
                      message: `Vui lòng nhập ${ele.name}!`,
                    },
                  ]}
                >
                  {ele.type === "NUMBER" ? <InputNumber /> : <Input />}
                </Form.Item>
              );
            })}
        </Card>
      </Form>
    </Modal>
  );
};

export default PopupSendZNS;
