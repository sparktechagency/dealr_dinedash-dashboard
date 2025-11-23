import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
  Tooltip,
  Upload,
} from "antd";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxUpload } from "react-icons/rx";
import { toast } from "sonner";
import {
  useDeleteRegionMutation,
  useGetAllRegionQuery,
  useUpdateRegionMutation,
} from "../../Redux/api/region/regionApi";
import { baseUrl } from "../../constant/baseUrl";

const RegionsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [modal, setModal] = useState({
    visible: false,
    type: null,
    region: null,
  });

  const { data: regions, isLoading } = useGetAllRegionQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);

  const [form] = Form.useForm();

  const [updateRegion] = useUpdateRegionMutation();
  const [deleteRegion] = useDeleteRegionMutation();

  const showModal = (type, region) => {
    setModal({ visible: true, type, region });
  };

  const handleOk = async () => {
    const toastId = toast.loading("Loading...");

    if (modal.type === "delete") {
      try {
        const res = await deleteRegion({ id: modal?.region?._id }).unwrap();

        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
      } catch (error) {
        toast.error(
          error?.data?.message || error?.error || "An error occurred",
          {
            id: toastId,
            duration: 2000,
          }
        );
      }
    }
    setModal({ visible: false, type: null, region: null });
  };

  const handleCancel = () => {
    setModal({ visible: false, type: null, region: null });
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Loading...");

    const image = values?.regionImage?.file?.originFileObj;

    const data = {
      name: values.regionName || modal.region.name,
      serialNo: Number(values.regionSerial) || modal.region.serialNo,
    };

    const formData = new FormData();
    formData.append("image", image || modal.region.image);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await updateRegion({
        id: modal.region._id,
        formData,
      }).unwrap();

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
    setModal({ visible: false, type: null, region: null });
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serialNo",
      key: "serialNo",
      width: 80,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Region Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      ellipsis: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Region Image",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (url) => (
        <img
          src={`${baseUrl}/${url}`}
          alt="Region"
          style={{
            width: 120,
            height: 50,
            borderRadius: 8,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-4">
          <Tooltip title="Delete Region">
            <RiDeleteBin6Line
              style={{
                color: "red",
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={() => showModal("delete", record)}
            />
          </Tooltip>

          <Tooltip title="Edit Region">
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={regions?.data?.result}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
        style={{ tableLayout: "fixed" }}
      />

      <div className="my-6">
        <Pagination
          onChange={(value) => setCurrentPage(value)}
          pageSize={regions?.data?.meta?.limit}
          total={regions?.data?.meta?.total}
          className="flex justify-end "
        />
      </div>

      <Modal
        visible={modal.visible}
        onCancel={handleCancel}
        footer={
          modal.type === "delete"
            ? [
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="delete" type="primary" danger onClick={handleOk}>
                  Delete
                </Button>,
              ]
            : ""
          //   (
          //   <Button
          //     key="close"
          //     type="primary"
          //     onClick={handleCancel}
          //     style={{
          //       backgroundColor: "#185DDE",
          //       borderColor: "#185DDE",
          //       color: "#fff",
          //     }}
          //   >
          //     Close
          //   </Button>
          // )
        }
      >
        {modal.type === "delete" && (
          <p>
            Are you sure you want to delete region{" "}
            <b>{modal.region?.regionName}</b>?
          </p>
        )}

        {modal.type === "edit" && (
          <div>
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
                  <div className="lg:w-[440px] p-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-transparent hover:border-primary transition-all duration-300 cursor-pointer">
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
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RegionsTable;
