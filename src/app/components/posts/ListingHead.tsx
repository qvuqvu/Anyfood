"use client";

import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Avatar from "../nav/Avatar";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  timePosted: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
  userName: string;
  rate: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  userName,
  title,
  locationValue,
  imageSrc,
  id,
  timePosted,
  currentUser,
  rate,
}) => {
  return (
    <>
      <div className="text-start flex-col flex gap-2">
        <div className="text-2xl h1 text-[28px] font-bold">{title}</div>
        <div className="flex gap-3 font-sans font-semibold">
          <Avatar /> {userName}
        </div>

        <div className="font-light text-neutral-500 mt-2">
          Đăng {timePosted} tại {locationValue}
        </div>

        <div className="flex items-center gap-1">
          <AiFillStar size={20} className="fill-rose-500" />
          <div className="font-bold">{rate}</div>/5 điểm
        </div>
      </div>
      <div
        className="
          w-8/12
          h-[80vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full h-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
