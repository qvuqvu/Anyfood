"use client";
import Link from "next/link";
import { LinkButtonProps } from "./types";

const sizes = {
  small: "px-2",
  large: "px-4",
};

const colors = {
  light: "text-primary after:bg-light_grey",
  dark: "text-secondary after:bg-light_grey",
  secondary: "bg-light_grey text-dark_primary hover:bg-border_grey",
  primary: "bg-primary text-white font-pops hover:bg-dark_primary",
};

function LinkButton({
  children,
  path = "/",
  size = "small",
  color = "dark",
  onClick,
}: LinkButtonProps) {
  return (
    <Link href={path}>
      <div
        className={`min-w-fit h-full flex-1 font-pops font-light ${sizes[size]} flex items-center relative after:block after:h-[2px] after:w-full ${colors[color]} after:absolute after:bottom-0 after:left-0 after:scale-x-0 after:scale-y-100 after:origin-top-right after:transition-transform after:duration-300 after:ease-linear hover:after:scale-x-100 hover:scale-y-100 hover:after:origin-bottom-left`}
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  );
}

export default LinkButton;
