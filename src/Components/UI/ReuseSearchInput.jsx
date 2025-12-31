/* eslint-disable react/prop-types */
import { SearchOutlined } from "@ant-design/icons";
import ReuseInput from "./ReuseInput";

const ReuseSearchInput = ({ placeholder, setSearch, setPage }) => {
  const handleSearch = (e) => {
    setPage(1);
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((value) => {
    setSearch(value);
  }, 500);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait); // Use spread operator for arguments
    };
  }

  return (
    <ReuseInput
      name="search"
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      onChange={handleSearch}
      formItemClassName="!mb-0"
      inputClassName="!bg-primary-color !text-base-color !border-[#E1E1E1]"
      prefix={<SearchOutlined className="text-[#667185] text-xl mr-2" />}
    />
  );
};

export default ReuseSearchInput;
