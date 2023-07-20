import { message } from "antd";
import MessageService from "src/adapters/services/message.service";
import { API_STATUS } from "src/constants";

export function useSendMessage() {
  async function sendZNS(data, accessToken) {
    let newData: any = {};
    newData.template_id = data.templateId;
    newData.phone = data.phone;
    if (data.templateData) {
      newData.template_data = data.templateData;
    } else {
      newData.template_data = {};
    }
    return MessageService.sendZNS(newData, {
      headers: { access_token: accessToken },
    });
  }

  return {
    sendZNS,
  };
}
