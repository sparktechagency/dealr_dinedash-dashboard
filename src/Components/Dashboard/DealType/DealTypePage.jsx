import { Button, Table, Tooltip } from "antd";
import PageWrapper from "../../UI/PageWrapper";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { baseUrl } from "../../../constant/baseUrl";
// import { useTranslation } from "react-i18next";
import AddDealType from "./AddDealType";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useAllDealTypeQuery } from "../../../Redux/api/dealType/dealTypeApi";
import DeleteDealType from "./DeleteDealType";

const DealType = () => {
  //   const { t } = useTranslation();

  //   const serverUrl = baseUrl;

  const { data, isFetching } = useAllDealTypeQuery({});

  const allDealType = data?.data?.attributes || [];

  const [addDealTypeModal, setAddDealTypeModal] = useState(false);
  const [deleteDealTypeOpen, setDeleteDealTypeOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleCancel = () => {
    setAddDealTypeModal(false);
    setDeleteDealTypeOpen(false);
    setCurrentRecord(null);
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "S.ID",
      key: "S.ID",
      render: (_, __, index) => index + 1,
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: 100,
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
                setDeleteDealTypeOpen(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  // t("employees.employees")
  //   {t("employees.addNewEmployee")}
  return (
    <PageWrapper isSearch={false} pageTitle="Deal Types">
      <div className="py-6">
        <Button
          onClick={() => setAddDealTypeModal(true)}
          className="w-full h-10 rounded-lg bg-[#185DDE] hover:!bg-[#185DDE] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
        >
          <HiOutlinePlusCircle className="text-xl" />
          Add New Deal Type
        </Button>
      </div>
      <div>
        <div>
          <Table
            columns={columns}
            dataSource={allDealType}
            loading={isFetching}
            pagination={false}
            rowKey="_id"
            scroll={{ x: true }}
          />
        </div>
        <AddDealType
          addDealTypeModal={addDealTypeModal}
          handleCancel={handleCancel}
        />
        <DeleteDealType
          deleteModal={deleteDealTypeOpen}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </PageWrapper>
  );
};

export default DealType;
