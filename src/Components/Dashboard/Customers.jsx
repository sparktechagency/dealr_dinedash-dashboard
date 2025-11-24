import { Pagination } from "antd";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../Redux/api/user/userApi";
import UsersTable from "../Tables/UsersTable";
import CustomerTopBar from "../UI/Customer/CustomerTopBar";
import PageWrapper from "../UI/PageWrapper";
import { useTranslation } from "react-i18next";

export default function Customers() {
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { t } = useTranslation();

  const { data: users, isFetching } = useGetAllUsersQuery([
    { name: "role", value: "user" },
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
    { name: "search", value: searchText },
  ]);

  const allCustomers = users?.data?.attributes?.users || [];
  const totalCustomers = users?.data?.attributes?.pagination?.totalResults || 0;

  const onSearch = (value) => setSearchText(value);

  return (
    <PageWrapper
      searchText={searchText}
      onSearch={onSearch}
      pageTitle={t("customers.customerList")}
    >
      <CustomerTopBar />

      <UsersTable
        data={allCustomers}
        loading={isFetching}
        pageSize={pageSize}
        page={currentPage}
      />

      <div className="my-6">
        <Pagination
          onChange={(value) => setCurrentPage(value)}
          pageSize={pageSize}
          current={currentPage}
          total={totalCustomers}
          className="flex justify-end "
        />
      </div>
    </PageWrapper>
  );
}
