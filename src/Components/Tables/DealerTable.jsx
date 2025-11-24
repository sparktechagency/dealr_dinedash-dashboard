/* eslint-disable react/prop-types */
import { EyeOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { baseUrl } from "../../constant/baseUrl";
import { formatDate } from "../../utils/dateFormet";
import { CgUnblock } from "react-icons/cg";

const DealerTable = ({
  allDealer,
  loading,
  page,
  limit,
  setCurrentRecord,
  setActionModal,
  setIsUnblockModalOpen,
  setIsViewModalOpen,
}) => {
  const serverUrl = baseUrl;
  const columns = [
    {
      title: "S.ID",
      dataIndex: "S.ID",
      key: "S.ID",
      render: (_, __, index) => page * limit - limit + index + 1,
      responsive: ["md"],
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={serverUrl + record?.image}
            alt={record?.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{record?.fullName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Post Code",
      dataIndex: "postalCode",
      key: "postalCode",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center">
          {record?.isBan ? (
            <Tooltip title="Unblock User">
              <CgUnblock
                style={{
                  color: "black",
                  fontSize: 18,
                  marginRight: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsUnblockModalOpen(true);
                  setCurrentRecord(record);
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Delete User">
              <MdBlock
                style={{
                  color: "red",
                  fontSize: 18,
                  marginRight: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActionModal(true);
                  setCurrentRecord(record);
                }}
              />
            </Tooltip>
          )}

          <Tooltip title="View Details">
            <EyeOutlined
              style={{
                color: "#185DDE",
                fontSize: 18,
                marginRight: 16,
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentRecord(record);
                setIsViewModalOpen(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={allDealer}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </>
  );
};

export default DealerTable;
