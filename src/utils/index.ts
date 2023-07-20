export const buildParams = (data?: any) => {
  if (data) {
    const dataEdited = {
      ...data,
    }

    let queryData: any = {}
    try {
      queryData = Object.fromEntries(
        Object.entries(dataEdited).filter(
          ([_, v]) => v != null && v !== "" && v !== -1
        )
      )
    } catch (err) {
      console.error("Có lỗi xảy ra: ", err)
    }

    return Object.keys(queryData)
      .map((key) => {
        if (Array.isArray(queryData[key])) {
          return `${key}=[${queryData[key]}]`
        }
        if (typeof queryData[key] === "object") {
          return `${key}=${JSON.stringify(queryData[key])}`
        }
        return `${key}=${encodeURIComponent(queryData[key])}`
      })
      .join("&")
  }
  return ""
}
export const buildURLWithParam = (url: string, query?: any) => {
  return url + "?" + buildParams(query)
}

export function extend(obj1, obj2) {
  return { ...obj1, ...obj2 }
}

export function numberWithCommas(number: any): string {
  return isNumber(number)
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "0"
}

export function formatNumber(number?: string | number): string | number {
  if (!number) return 0
  if (typeof number === "string") {
    return number ? Number(number).toLocaleString("vi") : ""
  }
  return isNumber(number) ? number.toLocaleString("vi") : 0
}

export function isNumber(value: any): boolean {
  return typeof value === "number" && isFinite(value)
}

export const removeEmpty = (obj) => {
  let newObj = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key])
    else if (obj[key] !== undefined && obj[key] !== null) newObj[key] = obj[key]
  })
  return newObj
}
