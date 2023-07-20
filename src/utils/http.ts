import { buildURLWithParam, extend } from "./index";
import { DOMAIN_API_URL } from "src/constants/";
import CacheHelper from "./cache";

export function fetch(
  url,
  params?: {},
  options?: {},
  timeOut?: 10,
  cacheKey?: any
) {
  const exOptions = extend({}, options);

  return window
    .fetch(buildURLWithParam(url, params), exOptions)
    .then(toJson)
    .then((result) => {
      result.error === 0 &&
        cacheKey &&
        CacheHelper.Set(cacheKey, result, timeOut);
      return result;
    })
    .then(validResp);
}

export const getWithPath = (
  path: string,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return getWithUrl(DOMAIN_API_URL + path, params, options, timeOut);
};

export const getWithUrl = (
  url: string,
  params?: any,
  options?: {},
  timeOut?: 10
) => {
  let tempParams: any = {
    ...params,
  };

  let isRefetch = tempParams.refetch;
  delete tempParams?.refetch;
  const cacheKey = CacheHelper.Hash(
    buildURLWithParam(url, { ...tempParams, ...options })
  );

  const cache = CacheHelper.Get(cacheKey);
  if (!cache || isRefetch) {
    delete params?.refetch;
    return fetch(url, params, options, timeOut, cacheKey);
  } else {
    return validResp(cache);
  }
};

export const getUrlFromPath = (path, params) => {
  return buildURLWithParam(DOMAIN_API_URL + path, params);
};

export const post = (
  url,
  params = {},
  data: any = {},
  options: any = {},
  timeOut
) => {
  return fetch(
    url,
    params,
    extend({ body: JSON.stringify(data) }, options),
    timeOut
  );
};

export const postWithUrlBinary = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  const formData = new FormData();
  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return fetch(
    url,
    params,
    extend({ body: formData, method: "POST" }, options),
    timeOut
  );
};

export const postWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return postWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const putWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return putWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const postWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "POST" }, options), timeOut);
};

export const putWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "PUT" }, options), timeOut);
};

function toJson(resp) {
  if (resp.ok) {
    return resp.json();
  }

  //return Promise.reject(resp);
}

function validResp(resp: any) {
  if (!resp) {
    return Promise.reject(resp);
  }
  return Promise.resolve(resp);
}
