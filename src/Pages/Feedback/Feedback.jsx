import { useState } from "react";
import FeedbackTable from "../../Components/Tables/FeedbackTable";
import RemoveFeedbackModal from "../../Components/Tables/RemoveFeedbackModal";
import ViewFeedbackModal from "../../Components/UI/ViewFeedbackModal";
import {
  useDeleteFeedbackMutation,
  useGetAllFeedbacksQuery,
} from "../../Redux/api/feedback/feedbackApi";
import { toast } from "sonner";

const Feedback = () => {
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  //* It's Use to Show Modal
  const [isFeedbackViewModalVisible, setIsFeedbackViewModalVisible] =
    useState(false);

  //* It's Use to Delete Modal
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: feedback, isLoading } = useGetAllFeedbacksQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
    
  ]);
  const feedbackList = feedback?.data?.attributes?.feedbacksList;
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const showViewFeedbackModal = (record) => {
    setCurrentRecord(record);
    setIsFeedbackViewModalVisible(true);
  };

  const showRemoveModal = (record) => {
    setCurrentRecord(record);
    setIsRemoveModalVisible(true);
  };

  const handleRemove = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      await deleteFeedback({ id: data?._id }).unwrap();
      toast.success("Feedback Deleted Successfully ", {
        id: toastId,
        duration: 2000,
      });
      setIsRemoveModalVisible(false);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during Login",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  const handleCancel = () => {
    setIsFeedbackViewModalVisible(false);
    setIsRemoveModalVisible(false);
  };

  return (
    <div
      className="bg-[#FFFFFF] min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">Feedback</p>
        </div>
      </div>

      {/* Table  */}
      <div className="px-10 py-10">
        <FeedbackTable
          data={feedbackList}
          loading={isLoading}
          pagination={feedback?.data?.attributes?.pagination}
          setCurrentPage={setCurrentPage}
          showViewFeedbackModal={showViewFeedbackModal}
          showRemoveModal={showRemoveModal}
          pageSize={12}
        />
      </div>

      {/* Modals */}
      <ViewFeedbackModal
        isFeedbackViewModalVisible={isFeedbackViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleRemove={handleRemove}
      />
      <RemoveFeedbackModal
        isRemoveModalVisible={isRemoveModalVisible}
        handleRemove={handleRemove}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default Feedback;
