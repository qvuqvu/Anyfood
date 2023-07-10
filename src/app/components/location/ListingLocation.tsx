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
interface ListingLocationProps {
  data: any;

}

const ListingLocation: React.FC<ListingLocationProps> = ({
  data,

}) => {
  const router = useRouter();
  // const { getByValue } = useCountries();

  // const location = getByValue(data.locationValue);

  return (
    <div
      onClick={() => router.push(`/location/${data.location.id}`)}
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
            src={data?.location?.images[0]}
            alt="Listing"
          />
        </div>

        <div className="font-semibold text-lg px-2 line-clamp-2">
          {data?.location?.name}
        </div>
        <div className="flex p-3 gap-2">
          
          <div className="font-light text-neutral-500 ">
            {data?.location?.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingLocation;
