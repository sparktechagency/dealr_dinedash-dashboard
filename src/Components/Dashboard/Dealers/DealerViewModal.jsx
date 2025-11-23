/* eslint-disable react/prop-types */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Modal, Typography } from "antd";
import { baseUrl } from "../../../constant/baseUrl";

const { Title, Text } = Typography;

const DealerViewModal = ({
  isViewModalOpen,
  currentRecord,
  setIsEditModalOpen,
  setIsViewModalOpen,
  handleCancel,
}) => {
  return (
    <ConfigProvider>
      <Modal
        // title="Confirm Delete"
        open={isViewModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={450}
        style={{ top: 100 }}
      >
        <div className="text-center space-y-3 py-4 bg-white">
          <Title level={2} className="!text-[#185DDE]">
            Dealer Details
          </Title>
          <Text type="secondary">
            See all details about {currentRecord?.name}
          </Text>

          <div>
            <Avatar
              size={90}
              src={`${baseUrl}/${currentRecord?.image}`}
              icon={<UserOutlined />}
              className="border-2 border-[#185DDE]"
            />
            <Title level={4} className="text-yellow-500 mt-2">
              {currentRecord?.name}
            </Title>
          </div>

          <div className="text-center space-y-2 mt-4 px-6">
            <Title level={3}>User Information</Title>

            <div className="flex gap-x-6">
              <Text>Serial No:</Text>
              <Text>06</Text>
            </div>

            <div className="flex gap-x-6">
              <Text>Name:</Text>
              <Text>{currentRecord?.name}</Text>
            </div>
            <div className="flex gap-x-6">
              <Text>Email:</Text>
              <Text>{currentRecord?.email}</Text>
            </div>

            <div className="flex gap-x-6">
              <Text>Business 1:</Text>
              <Text>The Cafe Rio</Text>
            </div>

            <div className="flex gap-x-6">
              <Text>Business 2:</Text>
              <Text>Cafe Barista</Text>
            </div>

            <div className="flex gap-x-6">
              <Text>Postcode:</Text>
              <Text>75462</Text>
            </div>
            <div className="flex gap-x-6">
              <Text>Joining Date:</Text>
              <Text>22/11/2024</Text>
            </div>
          </div>

          <Button
            type="primary"
            danger
            className="w-[90%] h-11 rounded-xl !bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
          >
            Block
          </Button>

          <div className="">
            <Button
              onClick={() => {
                setIsViewModalOpen(false);
                setIsEditModalOpen(true);
              }}
              className="w-[90%] h-11 rounded-xl !bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
            >
              Edit
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DealerViewModal;
