import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { RxUpload } from "react-icons/rx";
import { toast } from "sonner";
import { useCreateRegionMutation } from "../../Redux/api/region/regionApi";
import RegionsTable from "./RegionTable";

const Region = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [createRegion] = useCreateRegionMutation();

  const onFinish = async (values) => {
    const toastId = toast.loading("Loading...");

    const image = values?.regionImage?.file?.originFileObj;

    const data = {
      name: values.regionName,
      serialNo: Number(values.regionSerial),
    };

    console.log(data);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await createRegion(formData).unwrap();
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
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen rounded-xl bg-[#B7CDF5] border-2 border-[#185DDE]">
      <div className="">
        <div className="text-3xl font-medium rounded-t-lg  bg-[#185DDE] text-white mb-5">
          <h1 className="text-3xl font-medium rounded-t-lg p-5 bg-[#185DDE] text-white">
            Region
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
          <p className="text-xs sm:text-xl py-3">Add Region</p>
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
              label="Region Serial"
              name="regionSerial"
              style={{ fontWeight: "500", margin: "15px 0px" }}
            >
              <Input
                placeholder=""
                type="number"
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
              />
            </Form.Item>
            <Form.Item
              label="Region Name"
              name="regionName"
              style={{ fontWeight: "500", margin: "15px 0px" }}
            >
              <Input
                placeholder=""
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
        <RegionsTable />
      </div>
    </div>
  );
};

export default Region;
