import TemplateService from "src/adapters/services/template";

export function useGetTemplate() {
  async function getListTemplate(params, accessToken) {
    const resp: any = await TemplateService.getListTemplate(params, {
      headers: { access_token: accessToken },
    });
    return resp;
  }

  async function getDetailTemplate(params, accessToken) {
    const resp: any = await TemplateService.getDetailTemplate(params, {
      headers: { access_token: accessToken },
    });
    return resp;
  }

  return {
    getListTemplate,
    getDetailTemplate,
  };
}
