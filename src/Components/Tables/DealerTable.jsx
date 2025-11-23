/* eslint-disable react/prop-types */
import { EyeOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { AllImages } from "../../../public/images/AllImages";

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
const DealerTable = ({
  loading,
  setCurrentRecord,
  setActionModal,
  setIsViewModalOpen,
}) => {
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
              onClick={() => setActionModal(true)}
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
              onClick={() => {
                setCurrentRecord(record);
                setIsViewModalOpen(true);
              }}
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
    </>
  );
};

export default DealerTable;
