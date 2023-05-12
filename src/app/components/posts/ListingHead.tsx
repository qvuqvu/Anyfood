"use client";

import Image from "next/image";

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
}

const ListingHead: React.FC<ListingHeadProps> = ({
  userName,
  title,
  locationValue,
  imageSrc,
  id,
  timePosted,
  currentUser,
}) => {
  return (
    <>
      <div className="text-start">
        <div className="text-2xl h1 text-[28px] font-bold">{title}</div>
        <div className="flex gap-3 font-sans">
          Reviewed by <Avatar /> {userName}
        </div>

        <div className="font-light text-neutral-500 mt-2">
          Đăng {timePosted} tại {locationValue}
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
