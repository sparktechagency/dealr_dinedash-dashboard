/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useDeleteSubscriptionMutation } from "../../Redux/api/subscription/subscriptionApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const DeleteSubscriptionModal = ({
  isDeleteModalOpen,
  handleCancelDeleteModal,
  currentRecord,
}) => {
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const handleBlock = async () => {
    if (!currentRecord) return; // safety check

    const res = await tryCatchWrapper(
      deleteSubscription,
      { params: currentRecord._id },
      "Deleting Subscription..."
    );

    if (res?.statusCode === 201) {
      handleCancelDeleteModal();
    }
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalOpen}
      onOk={handleBlock}
      onCancel={handleCancelDeleteModal}
      okText="Delete"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <Button
            className="text-xl py-5 px-8 !text-base-color"
            type="primary"
            onClick={handleCancelDeleteModal}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#F5382C" }}
            onClick={() => handleBlock(currentRecord)}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-0">
        Do you want to Delete this?
      </p>
    </Modal>
  );
};

export default DeleteSubscriptionModal;
