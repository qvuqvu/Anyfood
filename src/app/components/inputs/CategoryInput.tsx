"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon?: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
  onClick2?: (value: string) => void;
  id: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  id,
  icon: Icon,
  label,
  selected,
  onClick,
  onClick2,
}) => {
  return (
    <div
      onClick={() => onClick(id) }
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryBox;
