import { Button, message, Space, Spin, Table } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTemplate } from "src/applications/template.usecase";
import { API_STATUS, ROUTE } from "src/constants";
import AuthContext from "src/hooks/useAuth";
import useDialog from "src/hooks/useDialog";
import EmptyCustom from "src/share/componens/EmptyCustom";
import { buildURLWithParam, removeEmpty } from "src/utils";
import PopupSendZNS from "../components/PopupSendZNS";
import { columnsListTemplate } from "./props";

interface TableParams {
  pagination: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const ListTemplate = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);
  const { getListTemplate, getDetailTemplate } = useGetTemplate();
  const [dataListTemplate, setDataListTemplate] = useState<any>();
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 },
  });
  const [dataTemplate, setDataTemplate] = useState();
  const [visible, { handleOpen, handleClose }] = useDialog();

  const handleGetListTemplate = (params) => {
    getListTemplate(params, accessToken).then((resp) => {
      if (resp.error === API_STATUS.SUCCESS) {
        setDataListTemplate({
          data: resp.data,
          total: resp.metadata.total,
        });
      } else {
        message.error("Đã có lỗi xảy ra, vui lòng thử lại!");
        setDataListTemplate({
          data: [],
          total: 0,
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const { current, pageSize } = tableParams.pagination || {};
    if (!current || !pageSize) return;
    const queryParam = {
      offset: (current - 1) * pageSize,
      limit: pageSize,
      status: tableParams.filters?.status && tableParams.filters?.status[0],
    };
    setSearchParams(removeEmpty(queryParam));
    setLoading(true);
    handleGetListTemplate(queryParam);
  }, [JSON.stringify(tableParams)]);

  const handleOpenPreviewTemplate = (templateId) => {
    getDetailTemplate(templateId, accessToken).then((resp) => {
      if (resp.error === API_STATUS.SUCCESS && resp.data) {
        setDataTemplate(resp.data);
        handleOpen();
      } else {
        message.error(resp.message);
      }
    });
  };
  const handleTableChange = (
    pagination,
    filters
    // sorter: SorterResult<ITemplateItem>
  ) => {
    const { status } = filters;
    setTableParams({
      pagination,
      filters: {
        ...tableParams.filters,
        status: status as FilterValue,
      },
    });
  };

  const columnsTable = [
    ...columnsListTemplate,
    {
      title: "Action",
      width: 200,
      key: "action",
      render: (_, item) => {
        return (
          <Space>
            <Button
              //disabled={item?.status !== "PENDING_REVIEW"}
              type="link"
              onClick={() =>
                navigate(
                  buildURLWithParam(ROUTE.DETAIL_TEMPALTE, {
                    id: item?.templateId,
                  })
                )
              }
            >
              View
            </Button>
            <Button
              type="text"
              onClick={() => handleOpenPreviewTemplate(item?.templateId)}
            >
              Send ZNS
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      {loading ? (
        <Spin></Spin>
      ) : (
        <div>
          {dataListTemplate?.total > 0 ? (
            <Table
              columns={columnsTable}
              rowKey={(record) => record.templateId}
              dataSource={dataListTemplate?.data}
              pagination={{
                ...tableParams.pagination,
                total: dataListTemplate?.total,
              }}
              loading={loading}
              onChange={handleTableChange}
            />
          ) : (
            <EmptyCustom />
          )}
          <PopupSendZNS
            visible={visible}
            dataTemplate={dataTemplate}
            handleClose={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default ListTemplate;
