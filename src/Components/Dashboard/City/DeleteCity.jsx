/* eslint-disable react/prop-types */
import { Modal } from "antd";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useDeleteCityMutation } from "../../../Redux/api/city/cityApi";

const DeleteCity = ({ deleteCityModal, handleCancel, currentRecord }) => {
  const [deleteCity] = useDeleteCityMutation();

  const handleDelete = async () => {
    // Implement delete logic here, possibly using currentRecord._id
    const res = await tryCatchWrapper(
      deleteCity,
      { params: currentRecord?._id },
      "Deleting City..."
    );

    if (res?.statusCode === 201) {
      handleCancel();
    }
  };
  return (
    <Modal
      open={deleteCityModal}
      onCancel={handleCancel}
      footer={null}
      width={450}
    >
      <div className="mt-8">
        <p className="text-2xl font-medium text-center">
          Do you want to Delete this City?
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

export default DeleteCity;
