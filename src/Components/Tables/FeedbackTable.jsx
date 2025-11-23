/* eslint-disable react/prop-types */
import { Button, Pagination, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
// import { RiDeleteBin6Line } from "react-icons/ri";

import { RiDeleteBin6Line } from "react-icons/ri";
import { AllImages } from "../../../public/images/AllImages";
import moment from "moment";
import { baseUrl } from "../../constant/baseUrl";

const FeedbackTable = ({
  data,
  loading,
  pagination,
  setCurrentPage,
  showViewFeedbackModal,
  showRemoveModal,
}) => {
  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "user.fullName",
      key: "user.fullName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={`${baseUrl}${record?.user?.image}` || AllImages.userImage}
            alt={record?.user?.fullName}
            className="w-8 h-8 rounded-full"
          />
          <p>{record?.user?.fullName || "N/A"}</p>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "user.email",
      key: "user.email",
      render: (text, record) => (
        <p>{record?.user?.email ? record?.user?.email : "N/A"}</p>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("lll")}</p>,
    },
    {
      title: "Review",
      dataIndex: "comment",
      key: "comment",
      render: (text) => <p>{text?.slice(0, 20)}...</p>, // Corrected rendering of description with slicing
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
                onClick={() => showViewFeedbackModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip>

            {/* Block User Tooltip */}
            <Tooltip placement="left" title="Remove This Report">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#F5382C",
                }}
                onClick={() => showRemoveModal(record)}
              >
                <RiDeleteBin6Line style={{ fontSize: "24px" }} />
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

      <div className="py-4">
        <Pagination
          onChange={(value) => setCurrentPage(value)}
          pageSize={pagination?.limit}
          total={pagination?.totalResults}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default FeedbackTable;
