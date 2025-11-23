/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";
import moment from "moment";
import { baseUrl } from "../../constant/baseUrl";

const ViewFeedbackModal = ({
  isFeedbackViewModalVisible,
  handleCancel,
  handleRemove,
  currentRecord,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-4xl ">Feedback</h2>
          <p className="text-[#989898] mt-3 text-xl">
            See full details feedback from {currentRecord?.user?.fullName}
          </p>
        </div>
      }
      open={isFeedbackViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="flex justify-start items-center p-4">
            {/* Avatar */}
            <img
              src={`${baseUrl}${currentRecord?.user?.image}` || AllImages.userImage}
              alt={currentRecord?.user?.fullName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.user?.fullName}
            </div>
          </div>

          <div className="mt-2">
            <div className="text-lg w-[90%] mx-auto">
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Name:</div>
                <div> {currentRecord?.user?.fullName}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Email:</div>
                <div>{currentRecord?.user?.email}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Date:</div>
                <div>{moment(currentRecord?.createdAt).format("lll")}</div>
              </div>

              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Review:</div>
                <div className="text-justify pt-0 ">
                  {currentRecord?.comment}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleRemove(currentRecord)}
        className="bg-secondary-color text-primary-color py-3 text-lg font-semibold rounded-lg mt-8 w-full"
      >
        Delete
      </button>
    </Modal>
  );
};

export default ViewFeedbackModal;
