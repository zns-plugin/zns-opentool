import { Table, Tag } from "antd";
import Link from "antd/es/typography/Link";
import {
  ITemplateQuality,
  ITemplateStatus,
  TEMPLATE_QUALITY,
  TEMPLATE_STATUS,
} from "src/adapters/services/template/config";
import { formatNumber } from "src/utils";

export const configDescriptionTemplate: any = [
  {
    title: "ID",
    dataIndex: "templateId",
    key: "templateId",
    colSpan: 1,
  },
  {
    title: "Tên",
    dataIndex: "templateName",
    key: "templateName",
    colSpan: 1,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    filters: Object.keys(TEMPLATE_STATUS).map((key) => ({
      text: key,
      value: TEMPLATE_STATUS[key]?.value,
    })),
    colSpan: 1,
    filterMultiple: false,
    render: (status: ITemplateStatus) => (
      <Tag color={TEMPLATE_STATUS[status].colorTag}>
        {TEMPLATE_STATUS[status]?.label}
      </Tag>
    ),
    key: "status",
  },
  {
    title: "Thời gian timeout(s)",
    dataIndex: "timeout",
    key: "timeout",
    colSpan: 1,
    render: (timeout) => <span>{timeout / 1000} s</span>,
  },
  {
    title: "Preview Url",
    dataIndex: "previewUrl",
    key: "previewUrl",
    render: (previewUrl) => (
      <Link href={previewUrl} target="_blank">
        {previewUrl}
      </Link>
    ),
    colSpan: 1,
  },
  {
    title: "Chất lượng gửi tin hiện tại",
    dataIndex: "templateQuality",
    key: "templateQuality",
    colSpan: 1,
    render: (templateQuality: ITemplateQuality) => (
      <Tag color={TEMPLATE_QUALITY[templateQuality].colorTag}>
        {TEMPLATE_QUALITY[templateQuality]?.label}
      </Tag>
    ),
  },
  {
    title: "Loại nội dung",
    dataIndex: "templateTag",
    key: "templateTag",
    colSpan: 1,
  },
  {
    title: "Đơn giá",
    dataIndex: "price",
    key: "price",
    colSpan: 1,
    render: (price) => <span>{formatNumber(price)} VNĐ</span>,
  },
  {
    title: "Áp dụng hạn mức Daily Quota",
    dataIndex: "applyTemplateQuota",
    key: "applyTemplateQuota",
    colSpan: 1,
    render: (isApply) => (
      <Tag color={isApply ? "blue" : "gray"}>{isApply ? "Có" : "Không"}</Tag>
    ),
  },
  {
    title: "Số tin được gửi trong ngày",
    dataIndex: "templateDailyQuota",
    key: "templateDailyQuota",
    colSpan: 1,
  },
  {
    title: "Số tin còn lại được gửi trong ngày",
    dataIndex: "templateRemainingQuota",
    key: "templateRemainingQuota",
    colSpan: 1,
  },
  {
    title: "Params",
    dataIndex: "listParams",
    key: "listParams",
    colSpan: 10,
    render: (listParams) => (
      <Table dataSource={listParams || []} pagination={false}>
        <Table.Column
          title="Tên"
          dataIndex="name"
          key="name"
          render={(name) => <span>{`<${name}>`}</span>}
        />
        <Table.Column
          title="Ký tự tối đa"
          dataIndex="maxLength"
          key="maxLength"
        />
        <Table.Column
          title="Ký tự tối thiểu"
          dataIndex="minLength"
          key="minLength"
        />
        <Table.Column
          title="Yêu cầu"
          dataIndex="require"
          key="require"
          render={(require) => (
            <Tag color={require ? "blue" : "gray"}>
              {require ? "Có" : "Không"}
            </Tag>
          )}
        />
      </Table>
    ),
  },
];
