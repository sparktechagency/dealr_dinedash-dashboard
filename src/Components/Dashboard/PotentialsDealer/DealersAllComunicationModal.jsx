/* eslint-disable react/prop-types */
import { ConfigProvider, Modal } from "antd";
import DealersAllComunicationTable from "./DealersAllComunicationTable";
import { useGetCommunicationByIdQuery } from "../../../Redux/api/potentialDealer/potentialDealerApi";

// eslint-disable-next-line react/prop-types
const DealersAllComunicationModal = ({
  isModalOpen,
  handleCancel,
  currentRecord,
}) => {
  const { data, isFetching } = useGetCommunicationByIdQuery(
    currentRecord?._id,
    {
      skip: !currentRecord?._id,
    }
  );
  console.log("data", data);
  const allCommunication = data?.data?.attributes || [];

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorBgElevated: "#B7CDF5",
            borderRadiusLG: 8,
          },
        },
      }}
    >
      <Modal
        // title="Confirm Delete"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 100 }}
        className="w-[90%] lg:!w-[1000px]"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">All Communication</h2>
          <DealersAllComunicationTable
            data={allCommunication}
            loading={isFetching}
            setPage={() => {}}
            page={1}
            total={allCommunication?.length}
            limit={10}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DealersAllComunicationModal;
