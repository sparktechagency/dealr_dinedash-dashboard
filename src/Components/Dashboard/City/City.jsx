import { Button, Pagination, Table, Tooltip } from "antd";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import PageWrapper from "../../UI/PageWrapper";
import DeleteCity from "./DeleteCity";
import AddCity from "./AddCity";
import EditCity from "./EditCity";

const dataSource = [
  {
    key: "1",
    "S.ID": 1,
    name: "Dhaka",
    count: 120,
  },
  {
    key: "2",
    "S.ID": 2,
    name: "Chattogram",
    count: 95,
  },
  {
    key: "3",
    "S.ID": 3,
    name: "Khulna",
    count: 72,
  },
  {
    key: "4",
    "S.ID": 4,
    name: "Rajshahi",
    count: 64,
  },
  {
    key: "5",
    "S.ID": 5,
    name: "Sylhet",
    count: 58,
  },
  {
    key: "6",
    "S.ID": 6,
    name: "Barisal",
    count: 40,
  },
  {
    key: "7",
    "S.ID": 7,
    name: "Rangpur",
    count: 49,
  },
  {
    key: "8",
    "S.ID": 8,
    name: "Mymensingh",
    count: 53,
  },
  {
    key: "9",
    "S.ID": 9,
    name: "Comilla",
    count: 68,
  },
  {
    key: "10",
    "S.ID": 10,
    name: "Narayanganj",
    count: 77,
  },
];

const City = () => {
  const [addCityModal, setAddCityModal] = useState(false);
  const [editCityModal, setEditCityModal] = useState(false);
  const [deleteCityModal, setDeleteCityModal] = useState(false);

  const handleCancel = () => {
    setAddCityModal(false);
    setEditCityModal(false);
    setDeleteCityModal(false);
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "S.ID",
      key: "S.ID",
      responsive: ["md"],
      align: "center",
    },
    {
      title: "City Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "User Count",
      dataIndex: "count",
      key: "count",
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
              onClick={() => setDeleteCityModal(true)}
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
              onClick={() => setEditCityModal(true)}
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
          dataSource={dataSource}
          loading={false}
          pagination={false}
          rowKey="id"
          scroll={{ x: true }}
        />
      </div>

      <div className="my-6">
        <Pagination
          //   onChange={(value) => setCurrentPage(value)}
          pageSize={10}
          total={50}
          className="flex justify-end "
        />
      </div>

      <AddCity addCityModal={addCityModal} handleCancel={handleCancel} />
      <EditCity editCityModal={editCityModal} handleCancel={handleCancel} />
      <DeleteCity
        deleteCityModal={deleteCityModal}
        handleCancel={handleCancel}
      />
    </PageWrapper>
  );
};

export default City;
