/* eslint-disable react/prop-types */
import { ConfigProvider, Modal } from "antd";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useMakeDealerMutation } from "../../../Redux/api/user/userApi";

const CreateADealer = ({ isModalOpen, setIsCustomerADealer, currentUser }) => {
  const [makeAdmin] = useMakeDealerMutation();
  const handleAccess = async (record) => {
    const res = await tryCatchWrapper(
      makeAdmin,
      {
        params: record?._id,
      },
      "Making Customer a Dealer..."
    );
    if (res?.statusCode === 200) {
      setIsCustomerADealer(false);
    }
  };
  return (
    <ConfigProvider>
      <Modal
        // title="Confirm Delete"
        open={isModalOpen}
        onCancel={() => setIsCustomerADealer(false)}
        footer={null}
        width={380}
        style={{ top: 100 }}
      >
        <div className="mt-8">
          <p className="text-2xl font-medium text-center">
            Are you sure? You want to make this customer a Dealer?
          </p>
          <div className="flex gap-10 px-8 mt-6">
            {/* Cancel Button */}
            <button
              onClick={() => setIsCustomerADealer(false)}
              className="px-5 h-11 w-full rounded-xl bg-gray-200 text-black hover:bg-gray-300"
            >
              Cancel
            </button>

            {/* Yes Button */}
            <button
              onClick={() => handleAccess(currentUser)}
              className="px-5 h-11 w-full rounded-xl bg-[#185DDE] text-white hover:bg-[#0f4cc9]"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default CreateADealer;
