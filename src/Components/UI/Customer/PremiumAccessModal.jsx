/* eslint-disable react/prop-types */
import { ConfigProvider, Modal } from "antd";

const PremiumAccessModal = ({ isModalOpen, setIsPremiumAccess }) => {
  return (
    <ConfigProvider>
      <Modal
        // title="Confirm Delete"
        open={isModalOpen}
        onCancel={() => setIsPremiumAccess(false)}
        footer={null}
        width={380}
        style={{ top: 100 }}
      >
        <div className="mt-8">
          <p className="text-2xl font-medium text-center">
            Are you sure? You want to give free access to Jhon Doe?
          </p>
          <div className="flex gap-10 px-8 mt-6">
            {/* Cancel Button */}
            <button
              onClick={() => setIsPremiumAccess(false)}
              className="px-5 h-11 w-full rounded-xl bg-gray-200 text-black hover:bg-gray-300"
            >
              Cancel
            </button>

            {/* Yes Button */}
            <button className="px-5 h-11 w-full rounded-xl bg-[#185DDE] text-white hover:bg-[#0f4cc9]">
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default PremiumAccessModal;
