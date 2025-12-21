/* eslint-disable react/prop-types */
import { Table } from "antd";

const ReuseTable = ({
  loading,
  columns,
  data,
  setPage,
  total,
  limit,
  page,
  onChange,
  keyValue,
}) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={
        total > 0
          ? {
              current: page,
              onChange: (page) => {
                if (setPage) {
                  setPage(page); // Call only if setPage is defined
                }
              },
              showSizeChanger: false,
              total,
              pageSize: limit,
            }
          : false
      }
      scroll={{ x: true }}
      rowKey={keyValue}
    />
  );
};

export default ReuseTable;
