/* eslint-disable react/prop-types */
import { formatDate } from "../../../utils/dateFormet";
import ReuseTable from "../../UI/ReuseTable";

const DealersAllComunicationTable = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => formatDate(record?.createdAt),
    },
    {
      title: "Contact Type",
      dataIndex: "contactType",
      key: "contactType",
    },
    {
      title: "subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: 350,
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"date"}
    />
  );
};

export default DealersAllComunicationTable;
