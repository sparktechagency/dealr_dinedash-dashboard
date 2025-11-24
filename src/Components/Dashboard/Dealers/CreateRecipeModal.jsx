/* eslint-disable react/prop-types */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, TimePicker, Upload } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RxUpload } from "react-icons/rx";
import { toast } from "sonner";
import { useGetAllCategoryQuery } from "../../../Redux/api/category/categoryApi";
import { useCreateRecipeMutation } from "../../../Redux/api/driver/recipe";
import { useGetAllRegionQuery } from "../../../Redux/api/region/regionApi";

const { Option } = Select;

const CreateRecipeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [pageSize] = useState(100);
  const [currentPage] = useState(1);
  const [form] = Form.useForm();

  const { data, isLoading: categoryLoading } = useGetAllCategoryQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);
  const category = data?.data?.result;

  const { data: region } = useGetAllRegionQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);
  const regions = region?.data?.result;

  const [createRecipe] = useCreateRecipeMutation();

  const onFinish = async (values) => {
    const toastId = toast.loading("Loading...");

    const image = values?.image?.file?.originFileObj;

    const data = {
      recipeName: values.recipeName,
      estimateTime: dayjs(values.estimateTime).format("HH:mm:ss"),
      difficultyLevel: values.difficultyLevel,
      origin: values.origin,
      description: values.description,
      ingredients: values.ingredients,
      instruction: values.instruction,
      cultureBackground: values.cultureBackground,
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await createRecipe(formData).unwrap();
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
      bodyStyle={{ padding: 24 }}
      closeIcon={<span style={{ fontSize: 18, fontWeight: "bold" }}>×</span>}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="middle"
        autoComplete="off"
      >
        {/* Upload Music Button */}
        <Form.Item>
          <Button
            className="hover:!bg-[#185DDE] hover:!text-white hover:!border-[#185DDE]"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              padding: "20px 20px",
              backgroundColor: "transparent",
            }}
            icon={<UploadOutlined />}
          >
            Add Music From Your Library
          </Button>
        </Form.Item>

        {/* Recipe Name and Estimated Time */}
        <div className="flex items-center justify-between gap-4">
          <Form.Item
            label="Recipe Name"
            name="recipeName"
            className="w-full"
            style={{ marginBottom: 8 }}
          >
            <Input
              placeholder="Enter recipe name"
              className="px-4 py-2 rounded-lg border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] bg-transparent focus:outline-none"
            />
          </Form.Item>

          <Form.Item
            label="Estimated Time"
            name="estimateTime"
            className="w-full"
            style={{ marginBottom: 8 }}
          >
            <TimePicker
              format="HH:mm"
              style={{
                width: "100%",
              }}
              className="px-4 rounded-lg border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] bg-transparent focus:outline-none"
              placeholder="HH:mm"
            />
          </Form.Item>
        </div>

        {/* Difficulty Level and Recipe Origin */}
        <div className="flex items-center justify-between gap-4">
          <Form.Item
            label="Difficulty Level"
            name="difficultyLevel"
            style={{ marginBottom: 8 }}
            className="w-full"
          >
            <Select
              disabled={categoryLoading}
              className="h-11 !rounded-xl"
              placeholder="Select difficulty"
              style={{ borderRadius: 8, backgroundColor: "#fef9e7" }}
              allowClear
            >
              {category?.map((item, index) => {
                return (
                  <Option key={index} value={item?.name}>
                    {item?.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Recipe Origin"
            name="origin"
            style={{ marginBottom: 8 }}
            className="w-full"
            // rules={[{ required: true, message: "Please select recipe origin" }]}
          >
            <Select
              className="h-11 !rounded-xl"
              placeholder="Select origin"
              style={{ borderRadius: 8, backgroundColor: "#fef9e7" }}
              allowClear
            >
              {regions?.map((item, index) => {
                return (
                  <Option key={index} value={item?.name}>
                    {item?.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          style={{ marginBottom: 8 }}
        >
          <Input.TextArea
            rows={2}
            placeholder="Description"
            className="px-4 rounded-lg border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] bg-transparent focus:outline-none"
            // style={{ borderRadius: 8, backgroundColor: "#fef9e7" }}
          />
        </Form.Item>

        {/* Ingredients */}
        <Form.Item
          label="Ingredients"
          name="ingredients"
          style={{ marginBottom: 8 }}
        >
          <Input.TextArea
            rows={2}
            placeholder="Ingredients"
            className="px-4 rounded-lg border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] bg-transparent focus:outline-none"
          />
        </Form.Item>

        {/* Instructions */}
        <Form.Item
          label="Instructions"
          name="instruction"
          style={{ marginBottom: 8 }}
        >
          <Input.TextArea
            rows={2}
            placeholder="Instructions"
            className="px-4 rounded-lg border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] bg-transparent focus:outline-none"
          />
        </Form.Item>

        {/* Cultural Background */}
        <Form.Item
          label="Cultural Background"
          name="cultureBackground"
          style={{ marginBottom: 8 }}
        >
          <Input.TextArea
            rows={1}
            placeholder="Cultural Background"
            className="px-4 py-2 rounded-lg border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] bg-transparent focus:outline-none"
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item name="image" className="mb-8 w-full">
          <Upload
            maxCount={1}
            listType="text"
            accept="image/*"
            multiple={false}
            customRequest={(options) => {
              setTimeout(() => {
                options.onSuccess?.("ok");
              }, 1000);
            }}
            className=""
          >
            <div className="lg:w-[720px] p-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-transparent hover:border-primary transition-all duration-300 cursor-pointer">
              <p className="text-3xl mb-2">
                <RxUpload />
              </p>
              <p className="text-black font-medium">
                Upload your region image here
              </p>
            </div>
          </Upload>
        </Form.Item>

        {/* Add Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#185DDE",
              borderRadius: 8,
              fontWeight: "600",
              height: 40,
              width: "100%",
            }}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRecipeModal;
