/* eslint-disable react/prop-types */
import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";

const YearOption = ({ currentYear, setThisYear }) => {
  const [yearOptions, setYearOptions] = useState([]); // Type state as an array of YearOption objects

  useEffect(() => {
    const startYear = 2020;
    const yearRange = [];

    // Add the years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);

  return (
    <>
      {" "}
      <style>{`
        .ant-select-selection-item{
          color: #F9FAFB !important;
        }
      `}</style>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorTextQuaternary: "#F9FAFB",
              fontSize: 16,
              borderRadius: 10,
              colorBorder: "#1d4ed8",
              colorText: "#2c2c2c",
              colorIcon: "#2c2c2c",
              colorBgContainer: "rgba(0,0,0,0)",
              colorBgElevated: "#FFFFFF",
              selectorBg: "#1d4ed8",
              colorTextPlaceholder: "#F9FAFB",
            },
          },
        }}
      >
        <Select
          defaultValue={currentYear >= 2025 ? "2025" : currentYear.toString()}
          style={{ width: 100 }}
          options={yearOptions}
          className="custom-select"
          onChange={(value) => setThisYear(value)}
        />
      </ConfigProvider>
    </>
  );
};

export default YearOption;
