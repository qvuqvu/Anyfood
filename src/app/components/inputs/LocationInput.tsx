"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon?: IconType;
  label: string;
  selected?: boolean;
  onClick: () => void;
  address: string;
  id: string;
}

const LocationBox: React.FC<CategoryBoxProps> = ({
  id,
  icon: Icon,
  label,
  selected,
  onClick,
  address,
}) => {
  return (
    <div
      onClick={() => onClick(id, address)}
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

export default LocationBox;
