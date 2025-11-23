/* eslint-disable react/prop-types */
import { cn } from "../../utils/cn";

const PageWrapper = ({
  searchText,
  onSearch,
  pageTitle,
  children,
  className,
  isSearch = true,
}) => {
  return (
    <div
      className={cn(
        "max-h-[85.5vh] overflow-y-auto rounded-xl bg-white border-2 border-[#185DDE] scrollbar-hide",
        className
      )}
    >
      <div className="bg-[#185DDE]">
        <div className="flex items-center justify-between pr-6">
          <h1 className="text-3xl font-medium rounded-t-lg p-5 bg-[#185DDE] text-white">
            {pageTitle}
          </h1>

          {isSearch && (
            <div className="">
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                  value={searchText}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-[96%] mx-auto">{children}</div>
    </div>
  );
};

export default PageWrapper;
