import { Pagination } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "../../Redux/api/user/userApi";
import UsersTable from "../Tables/UsersTable";
import CustomerTopBar from "../UI/Customer/CustomerTopBar";
import PageWrapper from "../UI/PageWrapper";
import { useTranslation } from "react-i18next";

export default function Customers() {
  const [searchText, setSearchText] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [blockUser] = useBlockUserMutation();
  const { t } = useTranslation();

  const { data: users, isLoading } = useGetAllUsersQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
    { name: "searchTerm", value: searchText },
  ]);

  const onSearch = (value) => setSearchText(value);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = () => setIsBlockModalVisible(true);

  const handleDelete = () => {
    // Perform delete action
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsBlockModalVisible(false);
  };

  const handleBlock = async (userId) => {
    const toastId = toast.loading("Loading...");

    try {
      await blockUser({ userId }).unwrap();
      handleCancel();
      toast.success("User has been blocked successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
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
    <PageWrapper
      searchText={searchText}
      onSearch={onSearch}
      pageTitle={t("customers.customerList")}
    >
      <CustomerTopBar />

      <UsersTable data={users} loading={isLoading} pageSize={pageSize} />

      <div className="my-6">
        <Pagination
          onChange={(value) => setCurrentPage(value)}
          pageSize={users?.data?.meta?.limit}
          total={users?.data?.meta?.total}
          className="flex justify-end "
        />
      </div>
    </PageWrapper>
  );
}
