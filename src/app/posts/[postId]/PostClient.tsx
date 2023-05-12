"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
// import { Range } from "react-date-range";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/components/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categoriesList } from "@/app/components/nav/categories";

import ListingHead from "@/app/components/posts/ListingHead";
import ListingInfo from "@/app/components/posts/ListingInfo";
import UserStatus from "@/app/components/UserStatus";
import useDate from "@/app/components/hooks/useDate";
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const PostClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  console.log("listing:", listing);
  const [isLoading, setIsLoading] = useState(false);
  console.log(listing.data.location[0].name);
  const formattedDate = useDate(listing.data.post.createdAt, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      <div
        className="flex max-w-[2520px]
        mx-auto
        laptop:px-28
        tablet:px-14
        mobile:px-4
        px-4 
        gap-4
        "
      >
        {/* POST */}
        <div>
          <div className="">
            <div className="max-w-screen-lg mb-8 mx-auto shadow-lg p-5 border-gray-200 border-[1px] rounded-2xl">
              <div className="flex flex-col gap-6">
                <ListingHead
                  rate={listing.data.post.rate}
                  title={listing.data.post.title}
                  imageSrc={listing.data.post.images[0]}
                  locationValue={listing.data.location[0].name}
                  timePosted={formattedDate}
                  id={listing.id}
                  userName={
                    listing.data.user.lastName +
                    " " +
                    listing.data.user.firstName
                  }
                  currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                  <ListingInfo
                    tags={listing.data.post.tags}
                    description={listing.data.post.content}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SIDEBAR */}
        <div className="flex flex-col">
          <UserStatus
            firstName={listing.data.user.firstName}
            lastName={listing.data.user.lastName}
          />
        </div>
      </div>
    </>
  );
};

export default PostClient;
