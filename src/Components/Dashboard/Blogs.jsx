import { Button, Card, Form, Input, Modal, Pagination, Upload } from "antd";
import moment from "moment/moment";
import { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { RxUpload } from "react-icons/rx";
import { toast } from "sonner";
import {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
} from "../../Redux/api/blog/blogApi";
import { baseUrl } from "../../constant/baseUrl";
const { Meta } = Card;

const Blogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();

  const { data: blogs } = useGetAllBlogsQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);

  const allBlogs = blogs?.data?.result;

  const [createBlog] = useCreateBlogMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Loading...");

    const image = values?.regionImage?.file?.originFileObj;

    const data = {
      headline: values.headline,
      description: values.description,
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await createBlog(formData).unwrap();
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
    <div className="max-h-[87vh] overflow-y-auto rounded-xl bg-[#B7CDF5] border-2 border-[#185DDE] scrollbar-hide">
      <div className="">
        <div className="">
          <div className="text-3xl font-medium rounded-t-lg  bg-[#185DDE] text-white mb-5">
            <h1 className="text-3xl font-medium rounded-t-lg p-5 bg-[#185DDE] text-white">
              Blogs
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
            <p className="text-xs sm:text-xl py-3">Add Blog</p>
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
              onFinish={onFinish}
              className="p-4"
            >
              {/* Plan Name */}
              <Form.Item
                label="Headline"
                name="headline"
                style={{ fontWeight: "500", margin: "15px 0px" }}
              >
                <Input
                  placeholder=""
                  className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                style={{ fontWeight: "500", margin: "15px 0px" }}
              >
                <Input.TextArea
                  placeholder=""
                  rows={4}
                  className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
                />
              </Form.Item>

              <Form.Item name="regionImage" className="mb-8 w-full">
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

              {/* Submit Button */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium mt-6"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 px-10 mt-6">
          {allBlogs?.map((blog, index) => {
            return (
              <div
                key={index}
                className="bg-[#B7CDF5] p-5 rounded-[20px] flex items-center justify-center"
              >
                <Card
                  hoverable
                  style={{ width: "100%", borderRadius: "20px" }}
                  cover={
                    <img
                      alt="example"
                      src={`${baseUrl}/${blog?.image}`}
                      className="h-[300px] object-cover !rounded-[20px]"
                    />
                  }
                >
                  <Meta
                    title={blog.headline}
                    description={moment(blog.createdAt).format("lll")}
                  />
                </Card>
              </div>
            );
          })}
        </div>

        <div className="p-5 sticky bottom-0 bg-[#B7CDF5] flex items-center justify-end">
          <Pagination
            onChange={(value) => setCurrentPage(value)}
            pageSize={blogs?.data?.meta?.limit}
            total={blogs?.data?.meta?.total}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
