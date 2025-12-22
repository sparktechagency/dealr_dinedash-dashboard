import { Button, Pagination, Table, Tooltip } from "antd";
import PageWrapper from "../../UI/PageWrapper";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";
import ViewEmployee from "./ViewEmployee";
import { baseUrl } from "../../../constant/baseUrl";
import { useGetEmployeeQuery } from "../../../Redux/api/employee/employeeApi";
import { useTranslation } from "react-i18next";

const Employee = () => {
  const { t } = useTranslation();

  const serverUrl = baseUrl;
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetEmployeeQuery({ page, limit });

  const allEmployees = data?.data?.attributes?.users || [];
  const totalEmployees = data?.data?.attributes?.pagination?.totalResults || 0;

  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
  const [viewEmployeeModalOpen, setViewEmployeeModalOpen] = useState(false);
  const [deleteEmployeeModalOpen, setDeleteEmployeeModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleCancel = () => {
    setEmployeeModalOpen(false);
    setEditEmployeeModalOpen(false);
    setViewEmployeeModalOpen(false);
    setDeleteEmployeeModalOpen(false);
    setCurrentRecord(null);
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "S.ID",
      key: "S.ID",
      render: (_, __, index) => page * limit - limit + index + 1,
      responsive: ["md"],
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={`${serverUrl}${record?.image}`}
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
      title: "Phone Number",
      dataIndex: "formatted_phone_number",
      key: "formatted_phone_number",
    },

    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      render: (_, record) => (
        <span>
          {record?.categories && record?.categories.length > 0
            ? record?.categories?.map((cat, idx) => (
                <span
                  key={cat ?? idx}
                  className="capitalize text-sm bg-[#185DDE]/10 rounded px-2 py-1 mr-1"
                >
                  {cat}{" "}
                </span>
              ))
            : "N/A"}
        </span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center">
          <Tooltip title="Delete City">
            <RiDeleteBin6Line
              style={{
                color: "#C50000",
                fontSize: 18,
                marginRight: 16,
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentRecord(record);
                setDeleteEmployeeModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit City">
            <FiEdit3
              style={{
                color: "#E6A71F",
                fontSize: 18,
                marginRight: 16,
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentRecord(record);
                setEditEmployeeModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit City">
            <LuEye
              style={{
                color: "#E6A71F",
                fontSize: 18,
                marginRight: 16,
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentRecord(record);
                setViewEmployeeModalOpen(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper isSearch={false} pageTitle={t("employees.employees")}>
      <div className="py-6">
        <Button
          onClick={() => setEmployeeModalOpen(true)}
          className="w-full h-10 rounded-lg bg-[#185DDE] hover:!bg-[#185DDE] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
        >
          <HiOutlinePlusCircle className="text-xl" />
          {t("employees.addNewEmployee")}
        </Button>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={allEmployees}
          loading={isFetching}
          pagination={false}
          rowKey="email"
          scroll={{ x: true }}
        />
      </div>

      <div className="my-6">
        <Pagination
          onChange={(page) => setPage(page)}
          pageSize={limit}
          current={page}
          total={totalEmployees}
          className="flex justify-end "
        />
      </div>

      <AddEmployee
        addEmployModal={employeeModalOpen}
        handleCancel={handleCancel}
      />

      <EditEmployee
        editEmployModal={editEmployeeModalOpen}
        currentRecord={currentRecord}
        handleCancel={handleCancel}
      />
      <DeleteEmployee
        deleteEmployeeModal={deleteEmployeeModalOpen}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />

      <ViewEmployee
        isViewModalOpen={viewEmployeeModalOpen}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </PageWrapper>
  );
};

export default Employee;
