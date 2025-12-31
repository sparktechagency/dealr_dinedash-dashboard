/* eslint-disable react/prop-types */
import { Modal } from "antd";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useDeleteDealTypeMutation } from "../../../Redux/api/dealType/dealTypeApi";

const DeleteDealType = ({ deleteModal, handleCancel, currentRecord }) => {
  const [deleteDealAdmin] = useDeleteDealTypeMutation();

  const handleDelete = async () => {
    // Implement delete logic here, possibly using currentRecord._id
    console.log(currentRecord);
    const res = await tryCatchWrapper(
      deleteDealAdmin,
      { params: currentRecord?._id },
      "Deleting Employee..."
    );

    if (res?.statusCode === 201) {
      handleCancel();
    }
  };
  return (
    <Modal open={deleteModal} onCancel={handleCancel} footer={null} width={450}>
      <div className="mt-8">
        <p className="text-2xl font-medium text-center">
          Do you want to Delete this Employee?
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
            onClick={handleDelete}
            className="px-5 h-11 w-full rounded-xl bg-[#CE0000] text-white hover:bg-[#CE0000]"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDealType;
