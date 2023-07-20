import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  ITemplateQuality,
  ITemplateStatus,
  TEMPLATE_QUALITY,
  TEMPLATE_STATUS,
} from "src/adapters/services/template/config";
import { ROUTE } from "src/constants";
import { buildURLWithParam } from "src/utils";

export interface ITemplateItem {
  createdTime: number;
  status: ITemplateStatus;
  templateId: string;
  templateName: string;
  templateQuality: ITemplateQuality;
}

export const columnsListTemplate: ColumnsType<ITemplateItem> = [
  {
    title: "Template ID",
    dataIndex: "templateId",
    key: "templateId",
    width: 150,
    render: (templateId: string) => (
      <Link
        to={buildURLWithParam(ROUTE.DETAIL_TEMPALTE, {
          id: templateId,
        })}
      >
        {templateId}
      </Link>
    ),
  },
  {
    title: "Template Name",
    dataIndex: "templateName",
    key: "templateName",
    width: 600,
  },
  {
    title: "Template Quality",
    dataIndex: "templateQuality",
    render: (templateQuality: ITemplateQuality) => (
      <Tag color={TEMPLATE_QUALITY[templateQuality].colorTag}>
        {TEMPLATE_QUALITY[templateQuality].label}
      </Tag>
    ),
    width: 200,
    align: "center",
    key: "templateQuality",
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: Object.keys(TEMPLATE_STATUS).map((key) => ({
      text: key,
      value: TEMPLATE_STATUS[key]?.value,
    })),
    filterMultiple: false,
    render: (status: ITemplateStatus) => (
      <Tag color={TEMPLATE_STATUS[status].colorTag}>
        {TEMPLATE_STATUS[status].label}
      </Tag>
    ),
    width: 200,
    align: "center",
    key: "status",
  },
  {
    title: "Created Time",
    dataIndex: "createdTime",
    width: 200,
    key: "createdTime",
    render: (createdTime: number) => dayjs(createdTime).format("DD/MM/YYYY"),
  },
];
