/* eslint-disable react/prop-types */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Modal, Typography } from "antd";
import { baseUrl } from "../../../constant/baseUrl";
import { formatDate } from "../../../utils/dateFormet";
import { useGetSpacificUserQuery } from "../../../Redux/api/user/userApi";
import SpinLoader from "../../UI/SpinLoader";
import DealersAllComunicationTable from "../PotentialsDealer/DealersAllComunicationTable";

const { Title, Text } = Typography;

const DealerViewModal = ({
  isViewModalOpen,
  currentRecord,
  setIsEditModalOpen,
  setIsViewModalOpen,
  handleCancel,
  setCurrentRecord,
}) => {
  const { data, isFetching } = useGetSpacificUserQuery(currentRecord?._id, {
    skip: !isViewModalOpen || !currentRecord?._id,
  });

  const userData = data?.data?.attributes?.[0];
  return (
    <ConfigProvider>
      <Modal
        // title="Confirm Delete"
        open={isViewModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="!w-[95%] lg:!w-[800px]"
        style={{ top: 100 }}
      >
        {isFetching ? (
          <SpinLoader />
        ) : (
          <div className="text-center space-y-3 py-4 bg-white">
            <Title level={2} className="!text-[#185DDE]">
              Dealer Details
            </Title>
            <Text type="secondary">
              See all details about {userData?.fullName}
            </Text>

            <div>
              <Avatar
                size={90}
                src={`${baseUrl}/${userData?.image}`}
                icon={<UserOutlined />}
                className="border-2 border-[#185DDE]"
              />
              <Title level={4} className="text-yellow-500 mt-2">
                {userData?.fullName}
              </Title>
            </div>

            <div className="text-center space-y-2 mt-4 px-6">
              <Title level={3}>User Information</Title>

              <div className="flex gap-x-6">
                <Text>Name:</Text>
                <Text>{userData?.fullName}</Text>
              </div>
              <div className="flex gap-x-6">
                <Text>Email:</Text>
                <Text>{userData?.email}</Text>
              </div>

              <div className="flex gap-x-6">
                <Text>Business:</Text>
                {userData?.businessNames?.map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </div>

              <div className="flex gap-x-6">
                <Text>Postcode:</Text>
                <Text>{userData?.postalCode}</Text>
              </div>
              <div className="flex gap-x-6">
                <Text>Joining Date:</Text>
                <Text>{formatDate(currentRecord?.createdAt)}</Text>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">All Communication</h2>
              <DealersAllComunicationTable
                data={userData?.communications}
                loading={isFetching}
                setPage={() => {}}
                page={1}
                total={userData?.communications?.length}
                limit={10}
              />
            </div>
            <div className="">
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setCurrentRecord(userData);
                  setIsEditModalOpen(true);
                }}
                className="w-[90%] h-11 rounded-xl !bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default DealerViewModal;
