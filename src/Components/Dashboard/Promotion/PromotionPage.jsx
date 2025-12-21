import { Button, Pagination, Table, Tooltip } from "antd";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import PageWrapper from "../../UI/PageWrapper";
import AddPromotion from "./AddPromotion";
import EditPromotion from "./EditPromotion";
import DeletePromotion from "./DeletePromotion";
import { AllImages } from "../../../../public/images/AllImages";

const PromotionPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const allCities = [
    {
      _id: "1",
      promotionType: "Coupon",
      subject: ["Summer Sale", "Winter Sale"],
      imageNote: AllImages.PDFImage,
    },
  ];
  const totalCities = 0;

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
      dataIndex: "promotionType",
      key: "promotionType",
      align: "center",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (postalCode) => postalCode?.join(", "),
      align: "center",
    },
    {
      title: "Image/Note",
      dataIndex: "imageNote",
      key: "imageNote",
      align: "center",
      render: (imageNote) => (
        <img
          src={imageNote}
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
          dataSource={allCities}
          loading={false}
          pagination={false}
          rowKey="_id"
          scroll={{ x: true }}
        />
      </div>

      <div className="my-6">
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          total={totalCities}
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
