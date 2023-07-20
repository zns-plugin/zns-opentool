import API from "src/constants/api";
import { getWithPath } from "src/utils/http";

const TemplateService = {
  getListTemplate: (params, options) => {
    return getWithPath(API.TEMPLATE.GET.LIST, params, options);
  },
  getDetailTemplate: (id, options) => {
    return getWithPath(
      API.TEMPLATE.GET.DETAIL,
      {
        template_id: id,
      },
      options
    );
  },
};
export default TemplateService;
