/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllNotificationsQuery } from "../../Redux/api/user/userApi";
import Spinner from "../Shared/Spinner";
import moment from "moment";
import { Pagination } from "antd";

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { data, isLoading } = useGetAllNotificationsQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: currentPage },
  ]);

  const notification = data?.data?.attributes?.notification;

  const savedLang = localStorage.getItem("dealr-lang") || "de";
  console.log(savedLang);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className=" bg-slate-50">
      <div className="flex items-center bg-[#185DDE] gap-1 py-3 px-5 mb-3">
        <Link to="/dashboard">
          <MdArrowBackIos className="text-xl sm:text-2xl lg:text-3xl text-primary-color" />
        </Link>
        <h1 className="text-3xl font-bold text-primary-color">Notification</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {notification?.map((not) => (
          <div
            key={not._id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className="bg-[#185DDE] p-2 rounded-full">
              <FiBell className="text-white w-6 h-6" />
            </div>

            {/* not text */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">
                {savedLang === "de" ? not.message?.de : not.message?.en}
              </span>
              <span className="text-sm text-gray-500">
                {moment(not.createdAt).format("MMM Do YY")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="py-6">
        <Pagination
          onChange={(value) => setCurrentPage(value)}
          pageSize={data?.data?.meta?.limit}
          total={data?.data?.meta?.total}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
export default Notifications;
