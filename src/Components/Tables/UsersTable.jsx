import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  message,
  Modal,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { MdBlock } from "react-icons/md";
import { AllImages } from "../../../public/images/AllImages";
import { baseUrl } from "../../constant/baseUrl";
import CreateADealer from "../UI/Customer/CustomerADealer";
import PremiumAccessModal from "../UI/Customer/PremiumAccessModal";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
const data = [
  {
    key: "1",
    "S.ID": "001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    postcode: "1207",
    joiningDate: "2023-01-15",
    userType: "Admin",
  },
  {
    key: "2",
    "S.ID": "002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    postcode: "1400",
    joiningDate: "2023-02-20",
    userType: "Teacher",
  },
  {
    key: "3",
    "S.ID": "003",
    name: "Clara Davis",
    email: "clara.davis@example.com",
    postcode: "1100",
    joiningDate: "2023-03-12",
    userType: "Student",
  },
  {
    key: "4",
    "S.ID": "004",
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
    postcode: "1216",
    joiningDate: "2023-04-25",
    userType: "Admin",
  },
  {
    key: "5",
    "S.ID": "005",
    name: "Eva Miller",
    email: "eva.miller@example.com",
    postcode: "1301",
    joiningDate: "2023-05-05",
    userType: "Teacher",
  },
  {
    key: "6",
    "S.ID": "006",
    name: "Frank Garcia",
    email: "frank.garcia@example.com",
    postcode: "1000",
    joiningDate: "2023-06-17",
    userType: "Student",
  },
  {
    key: "7",
    "S.ID": "007",
    name: "Grace Kim",
    email: "grace.kim@example.com",
    postcode: "1230",
    joiningDate: "2023-07-08",
    userType: "Admin",
  },
  {
    key: "8",
    "S.ID": "008",
    name: "Henry Wilson",
    email: "henry.wilson@example.com",
    postcode: "1240",
    joiningDate: "2023-08-13",
    userType: "Teacher",
  },
  {
    key: "9",
    "S.ID": "009",
    name: "Isla Brown",
    email: "isla.brown@example.com",
    postcode: "1122",
    joiningDate: "2023-09-02",
    userType: "Student",
  },
  {
    key: "10",
    "S.ID": "010",
    name: "Jake Turner",
    email: "jake.turner@example.com",
    postcode: "1500",
    joiningDate: "2023-10-10",
    userType: "Admin",
  },
];
const UsersTable = ({ loading, pageSize }) => {
  const [modal, setModal] = useState({
    visible: false,
    type: null,
    user: null,
  });

  const { t } = useTranslation();

  const [isPremiumAccess, setIsPremiumAccess] = useState(false);
  const [isCustomerADealer, setIsCustomerADealer] = useState(false);

  const showModal = (type, user) => {
    setModal({ visible: true, type, user });
  };

  const handleOk = () => {
    if (modal.type === "delete") {
      message.success(`User ${modal.user.fullName} deleted!`);
    }
    setModal({ visible: false, type: null, user: null });
  };

  const handleCancel = () => {
    setModal({ visible: false, type: null, user: null });
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "S.ID",
      key: "S.ID",
      // render: (_, __, index) => <p>00{index + 1}</p>,
      responsive: ["md"],
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={AllImages.userImage}
            alt={record.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Post Code",
      dataIndex: "postcode",
      key: "postcode",
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate ",
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center">
          <Tooltip title="Delete User">
            <MdBlock
              style={{
                color: "red",
                fontSize: 18,
                marginRight: 16,
                cursor: "pointer",
              }}
              onClick={() => showModal("delete", record)}
            />
          </Tooltip>

          <Tooltip title="View Details">
            <EyeOutlined
              style={{
                color: "#185DDE",
                fontSize: 18,
                marginRight: 16,
                cursor: "pointer",
              }}
              onClick={() => showModal("view", record)}
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
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
      />

      <Modal
        visible={modal.visible}
        width={modal.type === "view" ? 600 : 350}
        onCancel={handleCancel}
        footer={null}
      >
        {modal.type === "delete" && (
          <div className="mt-8">
            <p className="text-2xl font-medium text-center">
              {t("modalMessage.block")}
            </p>
            <div className="flex gap-10 px-8 mt-6">
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="px-5 h-11 w-full rounded-xl bg-gray-200 text-black hover:bg-gray-300"
              >
                {t("modalMessage.cancel")}
              </button>

              {/* Yes Button */}
              <button className="px-5 h-11 w-full rounded-xl bg-[#CE0000] text-white hover:bg-[#CE0000]">
                {t("modalMessage.blockButton")}
              </button>
            </div>
          </div>
        )}

        {modal.type === "view" && (
          <div className="text-center space-y-3 py-4 bg-white">
            <Title level={2} className="!text-[#185DDE]">
              {t("modalMessage.customerDetails")}
            </Title>
            <Text type="secondary">
              {t("modalMessage.seeAll")} {modal?.user?.name}
            </Text>

            <div>
              <Avatar
                size={90}
                src={`${baseUrl}/${modal?.user?.image}`}
                icon={<UserOutlined />}
                className="border-2 border-[#185DDE]"
              />
              <Title level={4} className="text-yellow-500 mt-2">
                {modal.user.name}
              </Title>
            </div>

            <div className="text-center space-y-2 mt-4 px-6">
              <Title level={3}>{t("modalMessage.userInfo")}</Title>

              <div className="flex gap-x-6">
                <Text>{t("view.serialNumber")}:</Text>
                <Text>06</Text>
              </div>

              <div className="flex gap-x-6">
                <Text>{t("view.name")}:</Text>
                <Text>{modal.user.name}</Text>
              </div>
              <div className="flex gap-x-6">
                <Text>{t("view.email")}:</Text>
                <Text>{modal.user.email}</Text>
              </div>
              <div className="flex gap-x-6">
                <Text>{t("view.postCode")}:</Text>
                <Text>75462</Text>
              </div>
              <div className="flex gap-x-6">
                <Text>{t("view.joiningDate")}:</Text>
                <Text>22/11/2024</Text>
              </div>
            </div>

            <div className="flex justify-center items-center gap-8">
              <Button
                onClick={() => {
                  setIsPremiumAccess(true);
                }}
                className="!bg-transparent w-[280px] h-11 rounded-2xl !text-[#185DDE] !border-[#185DDE]"
              >
                {t("view.premiumAccess")}
              </Button>
              <Button
                onClick={() => setIsCustomerADealer(true)}
                className="h-11 rounded-2xl w-[310px] !bg-[#185DDE] !text-white"
              >
                {t("view.makeThisCustomerAsDealer")}
              </Button>

              <PremiumAccessModal
                isModalOpen={isPremiumAccess}
                setIsPremiumAccess={setIsPremiumAccess}
              />
              <CreateADealer
                isModalOpen={isCustomerADealer}
                setIsCustomerADealer={setIsCustomerADealer}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UsersTable;
