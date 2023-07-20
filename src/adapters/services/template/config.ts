export const TEMPLATE_STATUS = {
  ENABLE: {
    value: "1",
    label: "Enable",
    colorTag: "green",
  },
  PENDING_REVIEW: {
    value: "2",
    label: "Pending Review",
    colorTag: "orange",
  },
  REJECT: {
    value: "3",
    label: "Reject",
    colorTag: "red",
  },
  DISABLE: {
    value: "4",
    label: "Disable",
    colorTag: "gray",
  },
}

export type ITemplateStatus = keyof typeof TEMPLATE_STATUS

export const TEMPLATE_QUALITY = {
  HIGH: {
    value: "HIGH",
    label: "High",
    colorTag: "green",
  },
  MEDIUM: {
    value: "MEDIUM",
    label: "Medium",
    colorTag: "orange",
  },
  LOW: {
    value: "LOW",
    label: "Low",
    colorTag: "red",
  },
  UNDEFINED: {
    value: "UNDEFINED",
    label: "Undefined",
    colorTag: "gray",
  },
}

export type ITemplateQuality = keyof typeof TEMPLATE_QUALITY

export interface IParam {
  name: string
  require: boolean
  type: string
  maxLength: number
  minLength: number
  acceptNull: boolean
}

export const TEMPLATE_TAG = {
  OTP: {
    value: "OTP",
    label: "OTP",
  },
  IN_TRANSACTION: {
    value: "IN_TRANSACTION",
    label: "Xác nhận/Cập nhật giao dịch",
  },
  POST_TRANSACTION: {
    value: "POST_TRANSACTION",
    label: "Hỗ trợ dịch vụ liên quan sau giao dịch",
  },
  ACCOUNT_UPDATE: {
    value: "ACCOUNT_UPDATE",
    label: "Cập nhật thông tin tài khoản",
  },
  GENERAL_UPDATE: {
    value: "GENERAL_UPDATE",
    label: "Thay đổi thông tin dịch vụ",
  },
  FOLLOW_UP: {
    value: "FOLLOW_UP",
    label: "Thông báo ưu đãi đến khách hàng cũ",
  },
}

export type ITemplateTag = keyof typeof TEMPLATE_TAG

export interface ITemplate {
  templateId: number
  templateName: string
  status: ITemplateStatus
  listParams: IParam[]
  timeout: number
  previewUrl: string
  templateQuality: ITemplateQuality
  templateTag: ITemplateTag
  price: string
  applyTemplateQuota: boolean
  templateDailyQuota: string
  templateRemainingQuota: string
}
