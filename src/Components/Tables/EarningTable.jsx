/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import moment from "moment";
import { GoEye } from "react-icons/go";

const transactions = [
  {
    transactionId: "TXN001",
    createdAt: "2025-07-13T10:00:00Z",
    amount: "$100.00",
  },
  {
    transactionId: "TXN002",
    createdAt: "2025-07-12T14:30:00Z",
    amount: "$250.00",
  },
  {
    transactionId: "TXN003",
    createdAt: "2025-07-11T09:45:00Z",
    amount: "$75.00",
  },
  {
    transactionId: "TXN004",
    createdAt: "2025-07-10T16:15:00Z",
    amount: "$120.00",
  },
  {
    transactionId: "TXN005",
    createdAt: "2025-07-09T13:20:00Z",
    amount: "$60.00",
  },
  {
    transactionId: "TXN006",
    createdAt: "2025-07-08T08:50:00Z",
    amount: "$300.00",
  },
  {
    transactionId: "TXN007",
    createdAt: "2025-07-07T11:40:00Z",
    amount: "$90.00",
  },
  {
    transactionId: "TXN008",
    createdAt: "2025-07-06T15:10:00Z",
    amount: "$45.00",
  },
  {
    transactionId: "TXN009",
    createdAt: "2025-07-05T18:25:00Z",
    amount: "$230.00",
  },
  {
    transactionId: "TXN010",
    createdAt: "2025-07-04T12:00:00Z",
    amount: "$85.00",
  },
  {
    transactionId: "TXN011",
    createdAt: "2025-07-03T09:30:00Z",
    amount: "$210.00",
  },
  {
    transactionId: "TXN012",
    createdAt: "2025-07-02T17:20:00Z",
    amount: "$55.00",
  },
  {
    transactionId: "TXN013",
    createdAt: "2025-07-01T14:45:00Z",
    amount: "$135.00",
  },
  {
    transactionId: "TXN014",
    createdAt: "2025-06-30T10:10:00Z",
    amount: "$195.00",
  },
  {
    transactionId: "TXN015",
    createdAt: "2025-06-29T16:50:00Z",
    amount: "$150.00",
  },
  {
    transactionId: "TXN016",
    createdAt: "2025-06-28T11:25:00Z",
    amount: "$240.00",
  },
  {
    transactionId: "TXN017",
    createdAt: "2025-06-27T13:15:00Z",
    amount: "$65.00",
  },
  {
    transactionId: "TXN018",
    createdAt: "2025-06-26T09:05:00Z",
    amount: "$110.00",
  },
  {
    transactionId: "TXN019",
    createdAt: "2025-06-25T14:55:00Z",
    amount: "$140.00",
  },
  {
    transactionId: "TXN020",
    createdAt: "2025-06-24T12:40:00Z",
    amount: "$170.00",
  },
];
const EarningTable = ({ data, loading, showViewModal }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      responsive: ["md"],
      render: (_, __, index) => <p>#00{index + 1}</p>,
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
      render: (text) => <p>{moment(text).format("lll")}</p>,
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
        dataSource={transactions}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default EarningTable;
