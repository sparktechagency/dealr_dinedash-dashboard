/* eslint-disable react/prop-types */
import { Button } from "antd";
import Spinner from "../Components/Shared/Spinner";
import { cn } from "../utils/cn";

const RButton = ({ isLoading, loadingMessage, type, className, onClick }) => {
  console.log(onClick, "onClick");
  return (
    <Button
      className={cn(
        className,
        "w-full h-11 rounded-xl bg-[#185DDE] hover:!bg-[#185DDE] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
      )}
      onClick={onClick}
      htmlType={type}
      disabled={isLoading}
    >
      {isLoading ? <Spinner size="small" /> : loadingMessage}
    </Button>
  );
};

export default RButton;
