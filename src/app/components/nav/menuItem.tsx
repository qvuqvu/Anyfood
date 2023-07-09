"use client";

import Command from "./command";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
  command: Command;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, command }) => {
  const handleClick = () => {
    command.execute();
  };
  return (
    <div
      onClick={handleClick}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      
      "
    >
      {label}
    </div>
  );
};

export default MenuItem;
