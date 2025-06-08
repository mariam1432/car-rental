import React from "react";

const BlogCard = ({
  className,
  title,
  description,
  noOfComments,
  date,
  handleClick,
}) => {
  return (
    <div className={`bg-white shadow-2xl rounded-[5px] ${className}`}>
      <div className="p-5">
        <h3 className="text-gray-700 text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <a
          className="cursor-pointer text-primary text-xs"
          onClick={handleClick}
        >
          READ MORE <i className="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div className="border-t-1 border-gray-200 p-5 text-gray-500 text-xs flex flex-row items-center gap-2">
        <p>{date}</p>
        <i className="fa-solid fa-circle text-[5px]"></i>

        {noOfComments && noOfComments > 0 ? (
          <p>
            {noOfComments}
            {noOfComments > 1 ? " comments" : " comment"}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
