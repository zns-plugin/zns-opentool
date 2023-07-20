declare global {
  interface Window {
    cacheObj: any;
  }
}
export default class CacheHelper {
  static Get(key) {
    if (window.cacheObj) {
      const cache = window.cacheObj[key];
      if (cache && cache.data && !this.IsExpried(cache.data)) {
        return cache.data;
      }
    }

    return null;
  }

  static Set(key, data, timeout) {
    console.log("Setcache");
    !timeout && (timeout = 30 * 60);
    let expiredTime = new Date().getTime() + timeout * 1000;
    data.expiredTime = expiredTime;

    !window.cacheObj && (window.cacheObj = {});
    window.cacheObj[key] = {
      data: data,
    };
  }

  static IsExpried(cacheObject) {
    if (cacheObject && cacheObject.expiredTime) {
      return new Date().getTime() > cacheObject.expiredTime;
    }

    return true;
  }
  static Hash(str) {
    var hash = 5381,
      i = str.length;

    while (i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }

    return hash >>> 0;
  }
}
