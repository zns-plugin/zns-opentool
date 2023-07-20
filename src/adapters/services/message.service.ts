import API from "src/constants/api";
import { postWithPath } from "src/utils/http";

const MessageService = {
  sendZNS: (data, options) => {
    return postWithPath(API.MESSAGE.POST.SEND_ZNS, {}, data, options);
  },
};
export default MessageService;
