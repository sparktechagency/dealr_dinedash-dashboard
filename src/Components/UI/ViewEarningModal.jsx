/* eslint-disable react/prop-types */
import { Avatar, Modal } from "antd";
import { useEffect } from "react";
import { baseUrl } from "../../constant/baseUrl";

const ViewEarningModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  useEffect(() => {
    if (isViewModalVisible && currentRecord) {
      console.log("Current Record:", currentRecord);
    }
  }, [isViewModalVisible, currentRecord]);

  return (
    <Modal
      title={
        <div className="pt-5">
          <h2 className="text-[#185DDE] text-3xl font-medium mb-5">
            User payment details
          </h2>
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:min-w-[600px]"
    >
      {currentRecord && (
        <div>
          <div className="rounded-xl bg-[#F5F9FE] p-5">
            <div className="flex justify-start items-center gap-2 mt-3 mb-5">
              <Avatar
                src={`${baseUrl}/${currentRecord?.image}`}
                alt={`${currentRecord?.user?.fullName}`}
                className="w-32 h-32 rounded-lg mr-2"
              />
              <div>
                <h1 className="sm:text-lg lg:text-2xl font-medium">
                  {currentRecord?.name}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-[#4E4E4E]">
                  {currentRecord?.role}
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  Email:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  {currentRecord?.email}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  User name:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  {currentRecord?.name}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  User Account:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  {currentRecord?.transactionId}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  Time & Date:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  {currentRecord?.date}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  Amount:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  {currentRecord?.amount}
                </p>
              </div>

              <div className="flex gap-2 mb-3">
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  Payment Method:
                </p>
                <p className="text-sm sm:text-base lg:text-lg  ">
                  {currentRecord?.paymentType}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewEarningModal;
