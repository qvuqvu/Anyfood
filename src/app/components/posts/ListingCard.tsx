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
interface ListingCardProps {
  data: SafeListing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  // const { getByValue } = useCountries();

  // const location = getByValue(data.locationValue);

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
      onClick={() => router.push(`/posts/${data.post.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full shadow-lg rounded-xl">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src="https://aws-s3-nodejs-reviewfood.s3.us-east-1.amazonaws.com/1683840057235-f5f9a059-bf6e-4aca-af88-9ebb371a6226.jpeg"
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="font-semibold text-lg px-2 line-clamp-2">
          {data.post.title}
        </div>
        <div className="flex p-3 gap-2">
          <Avatar/>
          <div className="font-light text-neutral-500 ">
            {data.user.firstName} {data.user.lastName}
          </div>
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
