/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { formatDate } from "../../utils/dateFormet";

const EarningTable = ({ page, limit, data, loading, showViewModal }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      responsive: ["md"],

      render: (_, __, index) => page * limit - limit + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Subscription Name",
      dataIndex: "subscriptionName",
      key: "subscriptionName",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Time & date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  border: "none",
                }}
                onClick={() => showViewModal(record)}
              >
                <GoEye
                  style={{ fontSize: "24px" }}
                  className="text-[#185DDE]"
                />
              </Button>
            </Tooltip>
          </Space>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default EarningTable;
