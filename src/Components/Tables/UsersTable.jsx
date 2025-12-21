/* eslint-disable react/prop-types */
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  // message,
  Modal,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { MdBlock } from "react-icons/md";
import { baseUrl } from "../../constant/baseUrl";
import CreateADealer from "../UI/Customer/CustomerADealer";
// import PremiumAccessModal from "../UI/Customer/PremiumAccessModal";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/dateFormet";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useBlockAndUnblockUserMutation } from "../../Redux/api/user/userApi";
import { CgUnblock } from "react-icons/cg";

const { Title, Text } = Typography;

const UsersTable = ({ data, loading, page, pageSize }) => {
  const [blockAndUnblockUser] = useBlockAndUnblockUserMutation();

  const [modal, setModal] = useState({
    visible: false,
    type: null,
    user: null,
  });

  const { t } = useTranslation();

  // const [isPremiumAccess, setIsPremiumAccess] = useState(false);
  const [isCustomerADealer, setIsCustomerADealer] = useState(false);

  const showModal = (type, user) => {
    setModal({ visible: true, type, user });
  };

  const handleCancel = () => {
    setModal({ visible: false, type: null, user: null });
  };

  const handleBlock = async (record) => {
    const res = await tryCatchWrapper(
      blockAndUnblockUser,
      {
        params: record?._id,
      },
      "Blocking..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (record) => {
    const res = await tryCatchWrapper(
      blockAndUnblockUser,
      {
        params: record?._id,
      },
      "Unblocking..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };

  const serverUrl = baseUrl;

  const columns = [
    {
      title: "S.ID",
      dataIndex: "S.ID",
      key: "S.ID",
      render: (_, __, index) => page * pageSize - pageSize + index + 1,
      responsive: ["md"],
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={serverUrl + record?.image}
            alt={record?.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{record?.fullName}</span>
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
      dataIndex: "postalCode",
      key: "postalCode",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <div className="flex items-center gap-1">
          {text?.map((item) => (
            <p
              className="capitalize text-sm bg-[#185DDE]/20 px-1 py-0.5 rounded"
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center">
          {record?.isBan ? (
            <Tooltip title="Unblock User">
              <CgUnblock
                style={{
                  color: "black",
                  fontSize: 18,
                  marginRight: 16,
                  cursor: "pointer",
                }}
                onClick={() => showModal("unblock", record)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Block User">
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
          )}

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
        {modal.type === "unblock" && (
          <div className="mt-8">
            <p className="text-2xl font-medium text-center">
              Are you sure you want to Unblock this User?
            </p>
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
                onClick={() => handleUnblock(modal?.user)}
                className="px-5 h-11 w-full rounded-xl bg-[#CE0000] text-white hover:bg-[#CE0000]"
              >
                Unblock
              </button>
            </div>
          </div>
        )}
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
              <button
                onClick={() => handleBlock(modal?.user)}
                className="px-5 h-11 w-full rounded-xl bg-[#CE0000] text-white hover:bg-[#CE0000]"
              >
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
              {t("modalMessage.seeAll")} {modal?.user?.fullName}
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
                <Text>{modal.user.fullName}</Text>
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
              {/* <Button
                onClick={() => {
                  setIsPremiumAccess(true);
                }}
                className="!bg-transparent w-[280px] h-11 rounded-2xl !text-[#185DDE] !border-[#185DDE]"
              >
                {t("view.premiumAccess")}
              </Button> */}

              {!modal?.user?.role?.includes("business") && (
                <Button
                  onClick={() => setIsCustomerADealer(true)}
                  className="h-11 rounded-2xl w-[310px] !bg-[#185DDE] !text-white"
                >
                  {t("view.makeThisCustomerAsDealer")}
                </Button>
              )}
              {/* <PremiumAccessModal
                isModalOpen={isPremiumAccess}
                setIsPremiumAccess={setIsPremiumAccess}
              /> */}
              <CreateADealer
                isModalOpen={isCustomerADealer}
                setIsCustomerADealer={setIsCustomerADealer}
                currentUser={modal?.user}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UsersTable;
