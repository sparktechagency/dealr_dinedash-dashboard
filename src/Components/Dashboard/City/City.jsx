import { Button, Pagination, Table, Tooltip } from "antd";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import PageWrapper from "../../UI/PageWrapper";
import DeleteCity from "./DeleteCity";
import AddCity from "./AddCity";
import EditCity from "./EditCity";
import { useGetCityQuery } from "../../../Redux/api/city/cityApi";

const City = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetCityQuery({ page, limit });

  const allCities = data?.data?.attributes?.results || [];
  const totalCities = data?.data?.attributes?.pagination?.totalResults || 0;

  const [addCityModal, setAddCityModal] = useState(false);
  const [editCityModal, setEditCityModal] = useState(false);
  const [deleteCityModal, setDeleteCityModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleCancel = () => {
    setAddCityModal(false);
    setEditCityModal(false);
    setDeleteCityModal(false);
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
      title: "City Name",
      dataIndex: "cityName",
      key: "cityName",
      align: "center",
    },
    {
      title: "Postal Code",
      dataIndex: "postalCode",
      key: "postalCode",
      render: (postalCode) => postalCode?.join(", "),
      align: "center",
    },
    {
      title: "User Count",
      dataIndex: "userCount",
      key: "userCount",
      align: "center",
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
                setDeleteCityModal(true);
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
                setEditCityModal(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper pageTitle="Cities" isSearch={false}>
      <div className="py-6">
        <Button
          onClick={() => setAddCityModal(true)}
          className="w-full h-10 rounded-lg bg-[#185DDE] hover:!bg-[#185DDE] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
        >
          <HiOutlinePlusCircle className="text-xl" />
          Add City
        </Button>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={allCities}
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
          total={totalCities}
          pageSize={limit}
          className="flex justify-end "
        />
      </div>

      <AddCity addCityModal={addCityModal} handleCancel={handleCancel} />
      <EditCity
        editCityModal={editCityModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeleteCity
        deleteCityModal={deleteCityModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </PageWrapper>
  );
};

export default City;
