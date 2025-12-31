/* eslint-disable react/prop-types */
import { Form, Input, Modal } from "antd";
import { useDeleteDealMutation } from "../../../Redux/api/deals/dealsApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const DeleteDealsModal = ({
  deleteDealsModalOpen,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [deleteDeals] = useDeleteDealMutation();

  const handleDelete = async (values) => {
    // Implement delete logic here, possibly using currentRecord._id
    const res = await tryCatchWrapper(
      deleteDeals,
      { params: currentRecord?.dealId, body: { reason: values.reason } },
      "Deleting..."
    );

    console.log(res);

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <Modal
      open={deleteDealsModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={450}
    >
      <div className="mt-8">
        <p className="text-2xl font-medium">Do you want to Delete this Deal?</p>
        <Form
          layout="vertical"
          form={form}
          className="bg-transparent w-full"
          onFinish={handleDelete}
        >
          {/* Business Name & Deal Type */}
          <div className="w-full mt-8">
            <label className="text-base-color text-sm font-semibold block mb-2">
              Reason *
            </label>
            <Form.Item name="reason" rules={[{ required: true }]}>
              <Input.TextArea
                className="px-4 py-2 rounded bg-transparent border-[#0C0C0C]"
                rows={3}
              />
            </Form.Item>
          </div>

          {/* Submit */}
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
              type="submit"
              className="px-5 h-11 w-full rounded-xl bg-[#CE0000] text-white hover:bg-[#CE0000]"
            >
              Delete
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DeleteDealsModal;
