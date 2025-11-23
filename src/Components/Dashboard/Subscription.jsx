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
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import { PlusOutlined } from "@ant-design/icons";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";
import {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionQuery,
} from "../../Redux/api/subscription/subscriptionApi";
import Spinner from "../Shared/Spinner";
import DeleteSubscriptionModal from "../UI/DeleteSubscriptionModal";
import EditSubscriptionModal from "../UI/EditSubscriptionModal";
import PageWrapper from "../UI/PageWrapper";
const { Option } = Select;

const subscriptions = [
  {
    _id: "1",
    planName: "Free",
    shortBio: "Ideal for testing the platform",
    price: 0,
    timeline: 30,
    facilities: ["Access to limited features", "1 team member"],
    isActive: true,
  },
  {
    _id: "2",
    planName: "Pro",
    shortBio: "Best for growing teams",
    price: 29,
    timeline: 30,
    facilities: [
      "All Free features",
      "Priority support",
      "Up to 10 team members",
    ],
    isActive: false,
  },
  {
    _id: "3",
    planName: "Enterprise",
    shortBio: "For large organizations",
    price: 299,
    timeline: 365,
    facilities: [
      "All Pro features",
      "Dedicated account manager",
      "Unlimited team members",
    ],
    isActive: true,
  },
];

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);
  const { data, isLoading } = useGetAllSubscriptionQuery([
    { name: "planCategory", value: activeKey === "1" ? "monthly" : "yearly" },
  ]);
  const [createSubscription] = useCreateSubscriptionMutation();

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const subscription = data?.data?.result;

  const [form] = Form.useForm();

  const [facilities, setFacilities] = useState([""]);

  const [subscriptionList, setSubscriptionList] = useState(subscription); // copy props if needed

  const handleToggle = (id, checked) => {
    const updatedSubs = subscriptionList.map((item) =>
      item._id === id ? { ...item, isActive: checked } : item
    );
    setSubscriptionList(updatedSubs);
  };

  const handleAdd = () => {
    setFacilities([...facilities, ""]);
  };

  const handleChange = (index, value) => {
    const newFacilities = [...facilities];
    newFacilities[index] = value;
    setFacilities(newFacilities);
    form.setFieldValue("facilities", newFacilities); // sync with form
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const toastId = toast.loading("Loading....");

    form.validateFields().then((values) => {
      // Create a new subscription object
      const newSubscription = {
        planCategory: values.planCategory,
        planName: values.planName,
        shortBio: values.shortBio,
        price: Number(values.planPrice),
        timeline: values.planCategory === "monthly" ? 30 : 365,
        facilities: facilities,
      };

      console.log({ newSubscription });

      createSubscription(newSubscription)
        .unwrap()
        .then((res) => res.json)
        .then((data) => {
          toast.success("subscription created", {
            id: toastId,
            duration: 2000,
          });
        })
        .catch((error) => {
          toast.error(
            error?.data?.message || error?.error || "Something went wrong",
            {
              id: toastId,
              duration: 2000,
            }
          );
        });

      form.resetFields();
      setIsModalOpen(false);
    });
  };

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

  if (isLoading) {
    return <Spinner size="large" />;
  }

  return (
    <PageWrapper isSearch={false} pageTitle="Subscription Plan">
      <div className="mt-6">
        <div className="w-[95%] mx-auto">
          <Button
            type="primary"
            onClick={showModal}
            className="w-full h-12 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
          >
            <FiEdit className="text-2xl text-primary-color" />
            <p className="text-xs sm:text-xl py-3">Create Subscription Plan</p>
          </Button>
        </div>

        <div>
          <Tabs
            defaultActiveKey="1"
            size="large"
            className="w-[95%] mx-auto"
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

        <div>
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
              {/* Plan Category */}
              <Form.Item
                label="Plan Category"
                name="planCategory"
                style={{ fontWeight: "500", margin: "15px 0px" }}
              >
                <Select
                  placeholder="Select plan category"
                  className="h-11 !text-sm"
                  style={{ backgroundColor: "transparent", color: "#000" }}
                >
                  <Option
                    style={{
                      color: "#000",
                    }}
                    value="monthly"
                  >
                    Monthly
                  </Option>
                  <Option
                    style={{
                      color: "#000",
                    }}
                    value="yearly"
                  >
                    Yearly
                  </Option>
                </Select>
              </Form.Item>

              {/* Plan Name */}
              <Form.Item
                label="Plan Name"
                name="planName"
                style={{ fontWeight: "500", margin: "15px 0px" }}
              >
                <Input
                  placeholder="Enter Plan name"
                  className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
                />
              </Form.Item>

              {/* Short Bio */}
              <Form.Item
                label="Short Bio"
                name="shortBio"
                style={{ fontWeight: "500", margin: "15px 0px" }}
              >
                <Input
                  placeholder="Enter a short bio"
                  className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
                />
              </Form.Item>

              {/* Plan Price */}
              <Form.Item
                label="Plan Price"
                name="planPrice"
                style={{ fontWeight: "500", margin: "15px 0px" }}
              >
                <Input
                  placeholder="Plan price"
                  type="number"
                  className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
                />
              </Form.Item>

              {/* Facilities */}
              <Form.Item
                label="Facilities"
                name="facilities"
                style={{ fontWeight: "500", margin: "15px 0px" }}
              >
                <>
                  {facilities.map((facility, index) => (
                    <Input
                      key={index}
                      value={facility}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder={`Facility ${index + 1}`}
                      className="px-4 py-3 mb-2 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none bg-transparent"
                    />
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

              {/* Submit Button */}
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
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 ">
          {subscriptions.map((sub, index) => (
            <Card
              key={index}
              style={{
                width: "100%",
                maxWidth: 350,
                padding: 0,
              }}
              className={`relative rounded-3xl shadow-lg h-fit my-6  !pb-16 ${
                sub?.price === 0 ? "bg-[#FFFFFF]" : "bg-[#E8EFFC] h-[550px]"
              } p-5`}
            >
              {/* Top-right action buttons */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <Tooltip title={sub?.isActive ? "Active" : "Inactive"}>
                  <Switch
                    checked={sub?.isActive}
                    onChange={(checked) => handleToggle(sub?._id, checked)}
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

              {/* Toggle */}

              <div className="mt-10 mb-4">
                <h3 className="text-xl font-bold">{sub?.planName} Plan</h3>
                <p className="text-sm text-gray-500">{sub?.shortBio}</p>
              </div>

              <div className="mb-4">
                <p className="text-3xl font-black text-black">
                  €{sub?.price}
                  {sub?.price !== 0 && (
                    <span className="text-sm font-medium text-gray-600">
                      {sub?.timeline === 30 ? " / month" : " / year"}
                    </span>
                  )}
                </p>
                {sub?.price === 0 && (
                  <div className="bg-yellow-100 text-[#185DDE] text-xs mt-2 px-3 py-1 rounded-md font-medium w-fit">
                    7-day free trial
                  </div>
                )}
              </div>

              <ul className="mb-5 space-y-2">
                {sub?.facilities?.map((feature, i) => (
                  <li key={i} className="flex items-center  gap-2">
                    <p className="mt-1 bg-[#F7E4BA] rounded-full size-6 flex items-center justify-center">
                      <MdOutlineDone className="text-[#185DDE] text-xl" />
                    </p>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-5 left-5 right-5 ">
                <Button
                  className={`w-full ${
                    sub?.price === 0
                      ? "border border-[#185DDE] text-[#185DDE]"
                      : "bg-[#185DDE] text-white"
                  } hover:opacity-90 font-semibold w-full h-11 rounded-xl`}
                >
                  {sub?.price === 0 ? "Start Free Trial" : "Get Started"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <EditSubscriptionModal
        isEditModalOpen={isEditModalOpen}
        handleCancelEditModal={handleCancelEditModal}
        currentRecord={currentRecord}
      />
      <DeleteSubscriptionModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleCancelDeleteModal={handleCancelDeleteModal}
        currentRecord={currentRecord}
      />
    </PageWrapper>
  );
}
