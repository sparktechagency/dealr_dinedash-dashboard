import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "../../Redux/api/category/categoryApi";
import CategoryTable from "./CategoryTable";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [createCategory] = useCreateCategoryMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    const toastId = toast.loading(" Loading...");

    try {
      const res = await createCategory(values).unwrap();
      if (res?.data) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
      }
      setIsModalOpen(false);
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

  return (
    <div className="min-h-screen rounded-xl bg-[#B7CDF5] border-2 border-[#185DDE]">
      <div className="">
        <div className="text-3xl font-medium rounded-t-lg  bg-[#185DDE] text-white mb-5">
          <h1 className="text-3xl font-medium rounded-t-lg p-5 bg-[#185DDE] text-white">
            Categories
          </h1>
        </div>
      </div>
      <div className="w-[95%] mx-auto">
        <Button
          type="primary"
          onClick={showModal}
          className="w-full h-12 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
        >
          <BiPlusCircle className="text-2xl text-primary-color" />
          <p className="text-xs sm:text-xl py-3">Add Category</p>
        </Button>
      </div>

      <div>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={800}
        >
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
                // onClick={handleSave}
                className="w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium mt-6"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="lg:w-[1000px] mx-auto">
        <CategoryTable />
      </div>
    </div>
  );
};

export default Category;
