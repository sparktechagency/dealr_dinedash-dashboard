import { Button, Pagination, Table, Tooltip } from "antd";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import PageWrapper from "../../UI/PageWrapper";
import AddPromotion from "./AddPromotion";
import EditPromotion from "./EditPromotion";
import DeletePromotion from "./DeletePromotion";
import { useGetPromotionQuery } from "../../../Redux/api/promotion/promotionApi";
import { baseUrl } from "../../../constant/baseUrl";

const PromotionPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching } = useGetPromotionQuery({ page, limit });

  const allPromotion = data?.data?.attributes || [];

  const [addPromotionModal, setAddPromotionModal] = useState(false);
  const [editPromotionModal, setEditPromotionModal] = useState(false);
  const [deletePromotionModal, setDeletePromotionModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleCancel = () => {
    setAddPromotionModal(false);
    setEditPromotionModal(false);
    setDeletePromotionModal(false);
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "_id",
      key: "_id",
      responsive: ["md"],
      render: (_, __, index) => page * limit - limit + index + 1,
      align: "center",
    },
    {
      title: "Promition Type",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Promition Code",
      dataIndex: "couponCode",
      key: "couponCode",
      align: "center",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Promition Code",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount ? discount + "%" : "N/A"} `,
      align: "center",
    },
    {
      title: "Image/Note",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => (
        <img
          src={baseUrl + image}
          alt="imageNote"
          className="w-full h-20 object-contain mx-auto"
        />
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
                setDeletePromotionModal(true);
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
                setEditPromotionModal(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper pageTitle="Promotion" isSearch={false}>
      <div className="py-6">
        <Button
          onClick={() => setAddPromotionModal(true)}
          className="w-full h-10 rounded-lg bg-[#185DDE] hover:!bg-[#185DDE] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
        >
          <HiOutlinePlusCircle className="text-xl" />
          Add Promotion
        </Button>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={allPromotion}
          loading={isFetching}
          pagination={false}
          rowKey="_id"
          scroll={{ x: true }}
        />
      </div>

      <div className="my-6">
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          total={allPromotion?.length || 0}
          pageSize={limit}
          className="flex justify-end "
        />
      </div>

      <AddPromotion
        addPromotionModal={addPromotionModal}
        handleCancel={handleCancel}
      />
      <EditPromotion
        isModalOpen={editPromotionModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeletePromotion
        deletePromotionModal={deletePromotionModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </PageWrapper>
  );
};

export default PromotionPage;
