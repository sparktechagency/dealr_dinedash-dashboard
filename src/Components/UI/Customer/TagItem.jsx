/* eslint-disable react/prop-types */
const TagItem = ({ label, onRemove }) => {
  return (
    <div className="w-fit">
      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-base">
        {label}
        <button
          onClick={onRemove}
          className="text-blue-600 hover:text-blue-900 font-bold"
        >
          ×
        </button>
      </span>
    </div>
  );
};

export default TagItem;
