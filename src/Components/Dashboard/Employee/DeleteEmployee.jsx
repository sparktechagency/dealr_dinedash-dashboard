/* eslint-disable react/prop-types */
import { Modal } from "antd";

const DeleteEmployee = ({ deleteEmployeeModal, handleCancel }) => {
  return (
    <Modal
      open={deleteEmployeeModal}
      onCancel={handleCancel}
      footer={null}
      width={450}
    >
      <div className="mt-8">
        <p className="text-2xl font-medium text-center">
          Do you want to block this Customer?
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
          <button className="px-5 h-11 w-full rounded-xl bg-[#CE0000] text-white hover:bg-[#CE0000]">
            Block
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEmployee;
