/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { formatDate } from "../../utils/dateFormet";

const ViewEarningModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
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
            <div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  Email:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  {currentRecord?.userEmail}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  User name:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  {currentRecord?.userName}
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
                  {formatDate(currentRecord?.createdAt)}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  Amount:
                </p>
                <p className="text-sm sm:text-base lg:text-lg ">
                  ${currentRecord?.amount}
                </p>
              </div>
              <div className="flex gap-2 mb-3">
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  Payment Method:
                </p>
                <p className="text-sm sm:text-base lg:text-lg  ">
                  {currentRecord?.paymentMethod}
                </p>
              </div>
              <div className="flex gap-2 mb-3">
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  Subscription Plan:
                </p>
                <p className="text-sm sm:text-base lg:text-lg  ">
                  {currentRecord?.subscriptionName}
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
