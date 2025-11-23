/* eslint-disable react/prop-types */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Modal, Typography } from "antd";
import { baseUrl } from "../../../constant/baseUrl";
import { formatDate } from "../../../utils/dateFormet";

const { Title, Text } = Typography;

const ViewEmployee = ({ isViewModalOpen, currentRecord, handleCancel }) => {
  const serverUrl = baseUrl;
  return (
    <Modal
      open={isViewModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={450}
      style={{ top: 100 }}
    >
      <div className="text-center space-y-3 py-4 bg-white">
        <Title level={2} className="!text-[#185DDE]">
          Employee Details
        </Title>
        <Text type="secondary">
          See all details about {currentRecord?.fullName}
        </Text>

        <div>
          <Avatar
            size={90}
            src={`${serverUrl}/${currentRecord?.image}`}
            icon={<UserOutlined />}
            className="border-2 border-[#185DDE]"
          />
          <Title level={4} className="text-yellow-500 mt-2">
            {currentRecord?.fullName}
          </Title>
        </div>

        <div className="text-center space-y-2 mt-4 px-6">
          <Title level={3}>User Information</Title>

          <div className="flex gap-x-6">
            <Text>Name:</Text>
            <Text>{currentRecord?.fullName}</Text>
          </div>
          <div className="flex gap-x-6">
            <Text>Email:</Text>
            <Text>{currentRecord?.email}</Text>
          </div>
          <div className="flex gap-x-6">
            <Text>Category:</Text>
            {currentRecord?.categories?.map((cat, idx) => (
              <span
                key={cat ?? idx}
                className="capitalize bg-[#185DDE]/10 rounded px-2 py-1"
              >
                {cat}{" "}
              </span>
            ))}
          </div>

          <div className="flex gap-x-6">
            <Text>Postcode:</Text>
            {currentRecord?.postalCode?.map((code, idx) => (
              <span key={code ?? idx} className="capitalize">
                {code}{" "}
              </span>
            ))}
          </div>
          <div className="flex gap-x-6">
            <Text>Joining Date:</Text>
            <Text>{formatDate(currentRecord?.createdAt)}</Text>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewEmployee;
