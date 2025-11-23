/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  Tabs,
  Tooltip,
} from "antd";
import { useState, useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { PlusOutlined } from "@ant-design/icons";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";
import {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionQuery,
  useToggleSubscriptionStatusMutation,
} from "../../Redux/api/subscription/subscriptionApi";
import Spinner from "../Shared/Spinner";
import DeleteSubscriptionModal from "../UI/DeleteSubscriptionModal";
import EditSubscriptionModal from "../UI/EditSubscriptionModal";
import PageWrapper from "../UI/PageWrapper";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const { Option } = Select;

export default function Subscription() {
  const [toggleSubscriptionStatus] = useToggleSubscriptionStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data, isFetching } = useGetAllSubscriptionQuery({});
  const [createSubscription] = useCreateSubscriptionMutation();

  const [form] = Form.useForm();
  const [facilities, setFacilities] = useState([""]);
  const [subscriptionList, setSubscriptionList] = useState([]);

  // Load API data into subscriptionList
  useEffect(() => {
    if (data?.data?.attributes) {
      setSubscriptionList(data.data.attributes);
    }
  }, [data]);

  // Filter by active tab
  const filteredSubscriptions = subscriptionList.filter((sub) =>
    activeKey === "1" ? sub.duration === 30 : sub.duration === 365
  );

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const handleAdd = () => {
    setFacilities([...facilities, ""]);
  };

  const handleChange = (index, value) => {
    const newFacilities = [...facilities];
    newFacilities[index] = value;
    setFacilities(newFacilities);
    form.setFieldValue("facilities", newFacilities);
  };

  const showModal = () => setIsModalOpen(true);
  const showEditModal = (record) => {
    setCurrentRecord(record);
    setIsEditModalOpen(true);
  };
  const handleCancelEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentRecord(null);
  };
  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalOpen(true);
  };
  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentRecord(null);
  };

  const handleSave = () => {
    const toastId = toast.loading("Loading...");
    form.validateFields().then((values) => {
      const newSubscription = {
        planName: values.planName,
        description: values.shortBio, // mapped to description
        feature: facilities, // mapped to feature array
        price: Number(values.planPrice),
        duration: values.planCategory === "monthly" ? 30 : 365, // duration in days
      };

      createSubscription(newSubscription)
        .unwrap()
        .then(() => {
          toast.success("Subscription created", {
            id: toastId,
            duration: 2000,
          });
        })
        .catch((error) => {
          toast.error(
            error?.data?.message || error?.error || "Something went wrong",
            { id: toastId, duration: 2000 }
          );
        });

      form.resetFields();
      setFacilities([""]); // reset facilities to 1 blank
      setIsModalOpen(false);
    });
  };

  const handleToggle = async (id) => {
    await tryCatchWrapper(
      toggleSubscriptionStatus,
      { params: id },
      "Updating Status..."
    );
  };

  if (isFetching) return <Spinner size="large" />;

  return (
    <PageWrapper isSearch={false} pageTitle="Subscription Plan">
      <div className="mt-6">
        {/* Create Subscription Button */}
        <div className="w-[95%] mx-auto">
          <Button
            type="primary"
            onClick={showModal}
            className="w-full h-12 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
          >
            <FiEdit3 className="text-2xl text-primary-color" />
            <p className="text-xs sm:text-xl py-3">Create Subscription Plan</p>
          </Button>
        </div>

        {/* Tabs */}
        <div className="w-[95%] mx-auto mt-4">
          <Tabs
            defaultActiveKey="1"
            size="large"
            onChange={handleTabChange}
            items={[
              {
                key: "1",
                label: (
                  <span
                    style={{
                      backgroundColor:
                        activeKey === "1" ? "#B7CDF5" : "transparent",
                      color: activeKey === "1" ? "#185DDE" : "#000",
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    Monthly
                  </span>
                ),
              },
              {
                key: "2",
                label: (
                  <span
                    style={{
                      backgroundColor:
                        activeKey === "2" ? "#B7CDF5" : "transparent",
                      color: activeKey === "2" ? "#185DDE" : "#000",
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    Yearly
                  </span>
                ),
              },
            ]}
          />
        </div>

        {/* Add Modal */}
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            onFinish={handleSave}
            layout="vertical"
            className="p-4"
          >
            <Form.Item
              label="Plan Category"
              name="planCategory"
              style={{ fontWeight: 500, margin: "15px 0px" }}
            >
              <Select
                placeholder="Select plan category"
                className="h-11 !text-sm"
              >
                <Option value="monthly">Monthly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Plan Name"
              name="planName"
              style={{ fontWeight: 500, margin: "15px 0px" }}
            >
              <Input
                placeholder="Enter Plan name"
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
              />
            </Form.Item>

            <Form.Item
              label="Short Bio"
              name="shortBio"
              style={{ fontWeight: 500, margin: "15px 0px" }}
            >
              <Input
                placeholder="Enter a short bio"
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
              />
            </Form.Item>

            <Form.Item
              label="Plan Price"
              name="planPrice"
              style={{ fontWeight: 500, margin: "15px 0px" }}
            >
              <Input
                placeholder="Plan price"
                type="number"
                className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
              />
            </Form.Item>

            <Form.Item
              label="Facilities"
              name="facilities"
              style={{ fontWeight: 500, margin: "15px 0px" }}
            >
              <>
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center mb-2 gap-2">
                    <Input
                      value={facility}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder={`Facility ${index + 1}`}
                      className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent flex-1"
                    />
                    {facilities.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => {
                          const newFacilities = facilities.filter(
                            (_, i) => i !== index
                          );
                          setFacilities(newFacilities);
                          form.setFieldValue("facilities", newFacilities);
                        }}
                        className="text-red-500 hover:text-red-700 p-0"
                      >
                        &minus;
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  onClick={handleAdd}
                  icon={<PlusOutlined />}
                  type="dashed"
                  style={{ marginTop: "10px" }}
                >
                  Add Facility
                </Button>
              </>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={handleSave}
                className="w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium mt-6"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Subscription Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          {filteredSubscriptions.map((sub) => (
            <Card
              key={sub._id}
              style={{ width: "100%", maxWidth: 350, padding: 0 }}
              className={`relative rounded-3xl shadow-lg h-fit my-6 !pb-16 ${
                sub.isActive === true
                  ? "bg-[#FFFFFF]"
                  : "bg-[#E8EFFC] h-[550px]"
              } p-5`}
            >
              {/* Actions */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <Tooltip title={sub.isActive ? "Active" : "Inactive"}>
                  <Switch
                    checked={sub.isActive}
                    onChange={(checked) => handleToggle(sub._id)}
                    size="small"
                    className="custom-yellow-switch"
                  />
                </Tooltip>
                <div
                  onClick={() => showDeleteModal(sub)}
                  className="p-1 rounded-full cursor-pointer hover:bg-gray-100"
                >
                  <RiDeleteBinLine className="text-[#185DDE] size-5" />
                </div>
                <div
                  onClick={() => showEditModal(sub)}
                  className="p-1 rounded-full cursor-pointer hover:bg-gray-100"
                >
                  <FiEdit3 className="text-[#185DDE] size-5" />
                </div>
              </div>

              {/* Plan Info */}
              <div className="mt-10 mb-4">
                <h3 className="text-xl font-bold">{sub.planName}</h3>
                <p className="text-sm text-gray-500">{sub.description}</p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-3xl font-black text-black">
                  €{sub.price}
                  {sub.price !== 0 && (
                    <span className="text-sm font-medium text-gray-600">
                      {sub.duration === 30 ? " / month" : " / year"}
                    </span>
                  )}
                </p>
                {sub.price === 0 && (
                  <div className="bg-yellow-100 text-[#185DDE] text-xs mt-2 px-3 py-1 rounded-md font-medium w-fit">
                    7-day free trial
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="mb-5 space-y-2">
                {sub.feature?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <p className="mt-1 bg-[#185DDE] rounded-full size-6 flex items-center justify-center">
                      <MdOutlineDone className="text-[#fff] text-xl" />
                    </p>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <EditSubscriptionModal
          isEditModalOpen={isEditModalOpen}
          handleCancelEditModal={handleCancelEditModal}
          currentRecord={currentRecord}
        />
        {currentRecord && (
          <DeleteSubscriptionModal
            isDeleteModalOpen={isDeleteModalOpen}
            handleCancelDeleteModal={handleCancelDeleteModal}
            currentRecord={currentRecord}
          />
        )}
      </div>
    </PageWrapper>
  );
}
