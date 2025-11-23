import { Button, Form, Input, Modal, Pagination, Table, Tooltip } from "antd";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../Redux/api/category/categoryApi";

const CategoryTable = () => {
  const [modal, setModal] = useState({
    visible: false,
    type: null,
    category: null,
  });
  const [pageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

  const { data: allCategory, isLoading: loading } = useGetAllCategoryQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
    // { name: "searchTerm", value: searchText },
  ]);

  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const showModal = (type, category) => {
    setModal({ visible: true, type, category });
  };

  const handleOk = async () => {
    const toastId = toast.loading(" Loading...");
    if (modal.type === "delete") {
      try {
        const res = await deleteCategory({ id: modal?.category?._id }).unwrap();
        if (res?.data) {
          toast.success(res.message, {
            id: toastId,
            duration: 2000,
          });
        }
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
    }
    setModal({ visible: false, type: null, category: null });
  };

  const handleCancel = () => {
    setModal({ visible: false, type: null, category: null });
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serialNo",
      key: "serialNo",
      width: 200,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      ellipsis: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "actions",
      width: 200,
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-4">
          <Tooltip title="Delete Category">
            <RiDeleteBin6Line
              style={{
                color: "red",
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={() => showModal("delete", record)}
            />
          </Tooltip>

          <Tooltip title="Edit Category">
            <FiEdit
              style={{
                color: "#185DDE",
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={() => showModal("edit", record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const onFinish = async (values) => {
    const toastId = toast.loading(" Loading...");

    try {
      const res = await updateCategory({
        ...values,
        id: modal?.category?._id,
      }).unwrap();
      if (res?.data) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
      }
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
    setModal({ visible: false, type: null, category: null });
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={allCategory?.data?.result}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
        style={{ tableLayout: "fixed" }}
      />

      <Modal
        visible={modal.visible}
        onCancel={handleCancel}
        footer={
          modal.type === "delete" ? (
            [
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="delete" type="primary" danger onClick={handleOk}>
                Delete
              </Button>,
            ]
          ) : (
            <Button
              key="close"
              type="primary"
              onClick={handleCancel}
              style={{
                backgroundColor: "#185DDE",
                borderColor: "#185DDE",
                color: "#fff",
              }}
            >
              Close
            </Button>
          )
        }
      >
        {modal.type === "delete" && (
          <p className="text-lg">Are you sure you want to delete Category </p>
        )}

        {modal.type === "edit" && (
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              facilities: ["Boost voucher to popular"],
            }}
            onFinish={onFinish}
            className="p-4"
          >
            {/* Plan Name */}
            <Form.Item
              label="Category Serial"
              name="serialNo"
              style={{ fontWeight: "500", margin: "15px 0px" }}
            >
              <Input
                placeholder=""
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
              />
            </Form.Item>

            <Form.Item
              label="Category Name"
              name="name"
              style={{ fontWeight: "500", margin: "15px 0px" }}
            >
              <Input
                placeholder=""
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium mt-6"
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      <div className="my-5">
        <Pagination
          onChange={(value) => setCurrentPage(value)}
          pageSize={allCategory?.data?.meta?.limit}
          total={allCategory?.data?.meta?.total}
          className="flex justify-end "
        />
      </div>
    </div>
  );
};

export default CategoryTable;
