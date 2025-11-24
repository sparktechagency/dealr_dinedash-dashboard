/* eslint-disable react/prop-types */
import { Modal } from "antd";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useBlockAndUnblockUserMutation } from "../../../Redux/api/user/userApi";

const DealerUnblockModal = ({ isModalOpen, handleCancel, currentRecord }) => {
  const [blockAndUnblockUser] = useBlockAndUnblockUserMutation();

  const handleUnblock = async (record) => {
    const res = await tryCatchWrapper(
      blockAndUnblockUser,
      {
        params: record?._id,
      },
      "Unblocking..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} width={450}>
      <div className="mt-8">
        <p className="text-2xl font-medium text-center">
          Do you want to unblock this Customer?
        </p>
        <div className="flex gap-10 px-8 mt-6">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="px-5 h-11 w-full rounded-xl bg-gray-200 text-black hover:bg-gray-300"
          >
            Cancel
          </button>

          {/* Yes Button */}
          <button
            onClick={() => handleUnblock(currentRecord)}
            className="px-5 h-11 w-full rounded-xl bg-green-500 text-white hover:bg-green-500"
          >
            Unblock
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DealerUnblockModal;
