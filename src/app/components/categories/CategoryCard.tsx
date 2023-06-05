"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
// import { format } from 'date-fns';

// import useCountries from "@/app/hooks/useCountries";
// import {
//   SafeListing,
//   SafeReservation,
//   SafeUser
// } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../buttons/Button1";
import ClientOnly from "../ClientOnly";
import Avatar from "../nav/Avatar";
interface CategoryCardProps {
  data: SafeListing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  return (
    <div
      // onClick={() => router.push(`/posts/${data.post.id}`)}
      className="col-span-1 cursor-pointer"
    >
      <div className="flex flex-col gap-2 hover:scale-110 transition ">
        <div className="absolute p-4 text-white font-semibold z-10 text-lg px-2">
          {data.name}
        </div>
        <img
          className=" 
             relative
              object-cover 
              w-full
              shadow-lg
              rounded-xl
            "
          src={data.image}
          alt="Listing"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
